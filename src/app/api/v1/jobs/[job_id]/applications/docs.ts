import { swaggerSecurity } from "@/lib/swagger/security";

const parameters = [
  {
    in: "path",
    name: "job_id",
    required: true,
    schema: { type: "string" },
  },
];

export const jobsIdApplicationsPaths = {
  "/api/v1/jobs/{job_id}/applications": {
    post: {
      operationId: "createJobApplication",
      tags: ["Job"],
      summary: "mengajukan penawaran aplikasi job",
      security: swaggerSecurity,
      parameters,
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["bid_price", "bid_note"],
              properties: {
                bid_price: { type: "integer" },
                bid_note: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    get: {
      operationId: "getAllJobApplications",
      tags: ["Job"],
      summary: "mendapatkan daftar lamaran pekerjaan dari driver",
      security: swaggerSecurity,
      parameters,
      responses: {
        200: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  applications: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        price: { type: "number" },
                        bid_note: { type: "string" },
                        created_at: { type: "string" },
                        updated_at: { type: "string" },
                        driver: {
                          type: "object",
                          properties: {
                            name: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    patch: {
      deprecated: true,
      tags: ["Jobs"],
      security: swaggerSecurity,
      parameters,
      responses: {
        200: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      deprecated: true,
      tags: ["Jobs"],
      security: swaggerSecurity,
      parameters,
      responses: {
        200: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },
};
