import { verifyBearerToken } from "@/lib/bearer-token";
import { database } from "@/lib/database";
import { APIResponse } from "@/lib/models/api-response";
import { sql } from "kysely";
import { NextRequest } from "next/server";
import { z } from "zod";

interface POSTResponse {
  success: boolean;
  id: string;
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const {
      title,
      description,
      type,
      available_until,
      price,
      location,
      delivery_area,
    } = json;

    // validasi input dari user
    const data = z
      .object({
        title: z
          .string({ required_error: "Judul tidak boleh kosong!" })
          .min(1, "Judul tidak boleh kosong!"),
        description: z.string().optional(),
        type: z.enum(["antar-jemput", "jasa-titip"]),
        available_until: z
          .string({
            required_error: "Waktu untuk penawaran tidak boleh kosong!",
          })
          .min(1, "Waktu untuk penawaran tidak boleh kosong!"),
        price: z
          .number({ required_error: "Biaya tidak boleh kosong!" })
          .min(0, "Biaya tidak boleh negatif!"),
        location: z
          .string({ required_error: "Lokasi tidak boleh kosong!" })
          .min(1, "Lokasi tidak boleh kosong!"),
        delivery_area: z.string().optional(),
      })
      .safeParse({
        title,
        description,
        type,
        available_until,
        price,
        location,
        delivery_area,
      });

    if (!data.success)
      return APIResponse.respondWithBadRequest(
        data.error.errors.map((it) => ({
          message: it.message,
          path: it.path[0] as string,
        }))
      );
    // validasi auth token
    const authorization = await verifyBearerToken(request);
    if (!authorization) return APIResponse.respondWithUnauthorized();

    // validasi role
    if (authorization.role == "customer")
      return APIResponse.respondWithForbidden(
        "Anda tidak memiliki akses untuk membuat offer!"
      );

    // console.log("Input JSON:", json);
    // console.log("Validation Result:", data);
    console.log("Authorization:", authorization);

    if (type === "jasa-titip") {
      /**
       * jasa-titip adalah service single offer dan hanya dapat dibuat oleh role
       *selain customer
       */
      console.log("Input Data:", {
        title,
        description,
        type,
        available_until,
        price,
        location,
        delivery_area,
        freelancer: authorization.userId,
      });

      const query = database
        .insertInto("single_offers")
        .values({
          title,
          description,
          type,
          available_until,
          price,
          location,
          delivery_area,
          freelancer: authorization.userId,
        } as any)
        .returning("id");

      console.log("Executing Query:", query.compile());

      const result = await query.executeTakeFirst();
      console.log("Query Result:", result);

      if (!result) return APIResponse.respondWithServerError();

      return APIResponse.respondWithSuccess<POSTResponse>({
        success: true,
        id: result.id,
      });
    } else if (type === "antar-jemput") {
      /**
       * jasa titip adalah service multiple job dan hanya dapat dibuat oleh role
       * customer
       */
    }
    return APIResponse.respondWithServerError();
  } catch (e) {
    return APIResponse.respondWithServerError();
  }
}

interface OfferFreelancer {
  name: string;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  type: string;
  available_until: string;
  price: number;
  location: string;
  delivery_area: string;
  freelancer: OfferFreelancer;
  created_at: string;
  updated_at: string;
}

interface GETResponse {
  offers: Offer[];
  page_info: {
    count: number;
    page: number;
    total_pages: number;
  };
}

export async function GET(request: NextRequest) {
  try {
    // validasi auth token
    const authorization = await verifyBearerToken(request);
    if (!authorization) return APIResponse.respondWithUnauthorized();

    // mendapatkan page and limit
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");

    const offersQuery = database
      .selectFrom("single_offers as so")
      .innerJoin("users as u", "u.id", "so.freelancer")
      .select([
        "so.id",
        "so.title",
        "so.description",
        "so.type",
        "so.available_until",
        "so.price",
        "so.location",
        "so.delivery_area",
        "u.name as freelancer_name",
      ])
      .select(sql<string>`so."xata.createdAt"`.as("created_at"))
      .select(sql<string>`so."xata.updatedAt"`.as("updated_at"))
      .offset((page - 1) * limit)
      .orderBy("created_at", "desc")
      .limit(limit);

    const offersResult = await offersQuery.execute();

    // Mendapatkan total row dari table single offers
    const queryCount = database
      .selectFrom("single_offers as so")
      .select(sql<number>`count(so.id)`.as("count"));
    const resultCount = await queryCount.executeTakeFirst();

    return APIResponse.respondWithSuccess<GETResponse>({
      offers: offersResult.map(
        (it) =>
          <Offer>{
            id: it.id,
            title: it.title,
            description: it.description,
            type: it.type,
            available_until: it.available_until,
            price: it.price,
            location: it.location,
            delivery_area: it.delivery_area,
            created_at: it.created_at,
            updated_at: it.updated_at,
            freelancer: <OfferFreelancer>{
              name: it.freelancer_name,
            },
          }
      ),
      page_info: {
        count: offersResult.length,
        page: page,
        total_pages: Math.ceil((resultCount?.count ?? 0) / limit),
      },
    });
  } catch (e) {
    return APIResponse.respondWithServerError();
  }
}
