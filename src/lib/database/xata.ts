// Generated by Xata Codegen 0.30.1. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "users",
    columns: [
      { name: "email", type: "text", notNull: true, defaultValue: "" },
      { name: "password", type: "text", notNull: true, defaultValue: "" },
      { name: "name", type: "text", notNull: true, defaultValue: "" },
      { name: "gender", type: "text", notNull: true, defaultValue: "" },
    ],
    revLinks: [
      { column: "freelancer", table: "offers" },
      { column: "customer", table: "deprecated_multi_jobs" },
      { column: "customer", table: "offer_applicants" },
      { column: "user", table: "chat_room_members" },
      { column: "last_sent_user", table: "chat_rooms" },
      { column: "user", table: "user_roles" },
      { column: "user", table: "user_sessions" },
      { column: "customer", table: "jobs" },
      { column: "freelancer", table: "jobs" },
      { column: "freelancer", table: "job_applications" },
      { column: "freelancer", table: "deprecated_multi_jobs" },
      { column: "freelancer", table: "multi_offers" },
      { column: "customer", table: "multi_offer_followers" },
      { column: "freelancer", table: "deprecated_multi_job_applications" },
      { column: "customer", table: "deprecated_multi_job_followers" },
      { column: "user", table: "chat_messages" },
    ],
  },
  {
    name: "chat_messages",
    columns: [
      { name: "message", type: "text", notNull: true, defaultValue: "" },
      {
        name: "is_deleted",
        type: "bool",
        notNull: true,
        defaultValue: "false",
      },
      { name: "room", type: "link", link: { table: "chat_rooms" } },
      { name: "user", type: "link", link: { table: "users" } },
    ],
    revLinks: [{ column: "last_read_message", table: "chat_room_members" }],
  },
  {
    name: "chat_rooms",
    columns: [
      { name: "last_message", type: "text", notNull: true, defaultValue: "" },
      { name: "last_sent_user", type: "link", link: { table: "users" } },
    ],
    revLinks: [
      { column: "room", table: "chat_messages" },
      { column: "room", table: "chat_room_members" },
    ],
  },
  {
    name: "user_roles",
    columns: [
      { name: "user", type: "link", link: { table: "users" } },
      { name: "role", type: "text", notNull: true, defaultValue: "" },
    ],
  },
  {
    name: "user_sessions",
    columns: [
      { name: "token", type: "text", notNull: true, defaultValue: "" },
      { name: "user", type: "link", link: { table: "users" } },
      { name: "role", type: "text", notNull: true, defaultValue: "" },
    ],
  },
  {
    name: "multi_offers",
    columns: [
      { name: "freelancer", type: "link", link: { table: "users" } },
      { name: "title", type: "text", notNull: true, defaultValue: "" },
      { name: "offer_status", type: "text", notNull: true, defaultValue: "" },
      { name: "price", type: "int", notNull: true, defaultValue: "0" },
      {
        name: "available_until",
        type: "datetime",
        notNull: true,
        defaultValue: "now",
      },
      { name: "description", type: "text", notNull: true, defaultValue: "" },
      { name: "pickup_area", type: "text", notNull: true, defaultValue: "" },
      { name: "delivery_area", type: "text", notNull: true, defaultValue: "" },
    ],
    revLinks: [{ column: "offer", table: "multi_offer_followers" }],
  },
  {
    name: "multi_offer_followers",
    columns: [
      { name: "offer", type: "link", link: { table: "multi_offers" } },
      {
        name: "delivery_location",
        type: "text",
        notNull: true,
        defaultValue: "",
      },
      { name: "note", type: "text", notNull: true, defaultValue: "" },
      { name: "payment_method", type: "text", notNull: true, defaultValue: "" },
      {
        name: "payment_status",
        type: "text",
        notNull: true,
        defaultValue: "unpaid",
      },
      { name: "status", type: "text", notNull: true, defaultValue: "pending" },
      { name: "customer", type: "link", link: { table: "users" } },
    ],
  },
  {
    name: "jobs",
    columns: [
      {
        name: "pickup_location",
        type: "text",
        notNull: true,
        defaultValue: "",
      },
      {
        name: "destination_location",
        type: "text",
        notNull: true,
        defaultValue: "",
      },
      { name: "note", type: "text", notNull: true, defaultValue: "" },
      { name: "service", type: "text", notNull: true, defaultValue: "" },
      { name: "customer", type: "link", link: { table: "users" } },
      { name: "freelancer", type: "link", link: { table: "users" } },
      { name: "price", type: "int", notNull: true, defaultValue: "0" },
      { name: "status", type: "text", notNull: true, defaultValue: "" },
      { name: "pickup_latitude", type: "float" },
      { name: "pickup_longitude", type: "float" },
      { name: "destination_latitude", type: "float" },
      { name: "destination_longitude", type: "float" },
      { name: "expected_price", type: "int", notNull: true, defaultValue: "0" },
    ],
    revLinks: [{ column: "job", table: "job_applications" }],
  },
  {
    name: "deprecated_multi_jobs",
    columns: [
      { name: "customer", type: "link", link: { table: "users" } },
      { name: "freelancer", type: "link", link: { table: "users" } },
      { name: "title", type: "text", notNull: true, defaultValue: "" },
      {
        name: "pickup_location",
        type: "text",
        notNull: true,
        defaultValue: "",
      },
      { name: "status", type: "text", notNull: true, defaultValue: "open" },
      { name: "note", type: "text", notNull: true, defaultValue: "" },
      { name: "service", type: "text", notNull: true, defaultValue: "" },
    ],
    revLinks: [
      { column: "job", table: "deprecated_multi_job_applications" },
      { column: "job", table: "deprecated_multi_job_followers" },
    ],
  },
  {
    name: "deprecated_multi_job_followers",
    columns: [
      { name: "job", type: "link", link: { table: "deprecated_multi_jobs" } },
      { name: "customer", type: "link", link: { table: "users" } },
      { name: "destination", type: "text", notNull: true, defaultValue: "" },
      { name: "status", type: "text", notNull: true, defaultValue: "pending" },
      { name: "note", type: "text", notNull: true, defaultValue: "" },
    ],
  },
  {
    name: "job_applications",
    columns: [
      { name: "bid_price", type: "int", notNull: true, defaultValue: "0" },
      { name: "freelancer", type: "link", link: { table: "users" } },
      { name: "job", type: "link", link: { table: "jobs" } },
      { name: "bid_note", type: "text", notNull: true, defaultValue: "" },
    ],
  },
  {
    name: "deprecated_multi_job_applications",
    columns: [
      { name: "price", type: "int", notNull: true, defaultValue: "0" },
      { name: "job", type: "link", link: { table: "deprecated_multi_jobs" } },
      { name: "freelancer", type: "link", link: { table: "users" } },
      { name: "status", type: "text", notNull: true, defaultValue: "pending" },
    ],
  },
  {
    name: "offers",
    columns: [
      { name: "freelancer", type: "link", link: { table: "users" } },
      { name: "price", type: "int", notNull: true, defaultValue: "0" },
      { name: "title", type: "text", notNull: true, defaultValue: "" },
      {
        name: "destination_area",
        type: "text",
        notNull: true,
        defaultValue: "",
      },
      { name: "description", type: "text", notNull: true, defaultValue: "" },
      { name: "type", type: "text", notNull: true, defaultValue: "" },
      {
        name: "offer_status",
        type: "text",
        notNull: true,
        defaultValue: "available",
      },
      {
        name: "available_until",
        type: "datetime",
        notNull: true,
        defaultValue: "now",
      },
      { name: "pickup_area", type: "text", notNull: true, defaultValue: "" },
      {
        name: "max_participants",
        type: "int",
        notNull: true,
        defaultValue: "1",
      },
    ],
    revLinks: [{ column: "offer", table: "offer_applicants" }],
  },
  {
    name: "offer_applicants",
    columns: [
      {
        name: "pickup_location",
        type: "text",
        notNull: true,
        defaultValue: "",
      },
      { name: "note", type: "text", notNull: true, defaultValue: "" },
      {
        name: "destination_location",
        type: "text",
        notNull: true,
        defaultValue: "",
      },
      { name: "offer", type: "link", link: { table: "offers" } },
      { name: "customer", type: "link", link: { table: "users" } },
      {
        name: "pickup_latitude",
        type: "float",
        notNull: true,
        defaultValue: "0.0",
      },
      {
        name: "pickup_longitude",
        type: "float",
        notNull: true,
        defaultValue: "0.0",
      },
      {
        name: "destination_latitude",
        type: "float",
        notNull: true,
        defaultValue: "0.0",
      },
      {
        name: "destination_longitude",
        type: "float",
        notNull: true,
        defaultValue: "0.0",
      },
      {
        name: "applicant_status",
        type: "text",
        notNull: true,
        defaultValue: "pending",
      },
      { name: "final_price", type: "int", notNull: true, defaultValue: "0" },
    ],
  },
  {
    name: "chat_room_members",
    columns: [
      { name: "room", type: "link", link: { table: "chat_rooms" } },
      { name: "user", type: "link", link: { table: "users" } },
      {
        name: "last_read_message",
        type: "link",
        link: { table: "chat_messages" },
      },
      {
        name: "unread_message_count",
        type: "int",
        notNull: true,
        defaultValue: "0",
      },
    ],
  },
  {
    name: "service_prices",
    columns: [
      { name: "category", type: "text", notNull: true, defaultValue: "" },
      { name: "title", type: "text", notNull: true, defaultValue: "" },
      { name: "min_price", type: "int", notNull: true, defaultValue: "0" },
      { name: "max_price", type: "int", notNull: true, defaultValue: "0" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Users = InferredTypes["users"];
export type UsersRecord = Users & XataRecord;

export type ChatMessages = InferredTypes["chat_messages"];
export type ChatMessagesRecord = ChatMessages & XataRecord;

export type ChatRooms = InferredTypes["chat_rooms"];
export type ChatRoomsRecord = ChatRooms & XataRecord;

export type UserRoles = InferredTypes["user_roles"];
export type UserRolesRecord = UserRoles & XataRecord;

export type UserSessions = InferredTypes["user_sessions"];
export type UserSessionsRecord = UserSessions & XataRecord;

export type MultiOffers = InferredTypes["multi_offers"];
export type MultiOffersRecord = MultiOffers & XataRecord;

export type MultiOfferFollowers = InferredTypes["multi_offer_followers"];
export type MultiOfferFollowersRecord = MultiOfferFollowers & XataRecord;

export type Jobs = InferredTypes["jobs"];
export type JobsRecord = Jobs & XataRecord;

export type DeprecatedMultiJobs = InferredTypes["deprecated_multi_jobs"];
export type DeprecatedMultiJobsRecord = DeprecatedMultiJobs & XataRecord;

export type DeprecatedMultiJobFollowers =
  InferredTypes["deprecated_multi_job_followers"];
export type DeprecatedMultiJobFollowersRecord = DeprecatedMultiJobFollowers &
  XataRecord;

export type JobApplications = InferredTypes["job_applications"];
export type JobApplicationsRecord = JobApplications & XataRecord;

export type DeprecatedMultiJobApplications =
  InferredTypes["deprecated_multi_job_applications"];
export type DeprecatedMultiJobApplicationsRecord =
  DeprecatedMultiJobApplications & XataRecord;

export type Offers = InferredTypes["offers"];
export type OffersRecord = Offers & XataRecord;

export type OfferApplicants = InferredTypes["offer_applicants"];
export type OfferApplicantsRecord = OfferApplicants & XataRecord;

export type ChatRoomMembers = InferredTypes["chat_room_members"];
export type ChatRoomMembersRecord = ChatRoomMembers & XataRecord;

export type ServicePrices = InferredTypes["service_prices"];
export type ServicePricesRecord = ServicePrices & XataRecord;

export type DatabaseSchema = {
  users: UsersRecord;
  chat_messages: ChatMessagesRecord;
  chat_rooms: ChatRoomsRecord;
  user_roles: UserRolesRecord;
  user_sessions: UserSessionsRecord;
  multi_offers: MultiOffersRecord;
  multi_offer_followers: MultiOfferFollowersRecord;
  jobs: JobsRecord;
  deprecated_multi_jobs: DeprecatedMultiJobsRecord;
  deprecated_multi_job_followers: DeprecatedMultiJobFollowersRecord;
  job_applications: JobApplicationsRecord;
  deprecated_multi_job_applications: DeprecatedMultiJobApplicationsRecord;
  offers: OffersRecord;
  offer_applicants: OfferApplicantsRecord;
  chat_room_members: ChatRoomMembersRecord;
  service_prices: ServicePricesRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://unitip-s-workspace-na7h8a.ap-southeast-2.xata.sh/db/unitip",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
