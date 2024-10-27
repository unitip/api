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
      { name: "roles", type: "multiple" },
      { name: "name", type: "text", notNull: true, defaultValue: "" },
    ],
    revLinks: [
      { column: "from", table: "chat_messages" },
      { column: "to", table: "chat_messages" },
      { column: "customerId", table: "customer_requests" },
      { column: "driverId", table: "driver_offers" },
      { column: "applicantId", table: "job_applications" },
      { column: "from_user", table: "chat_rooms" },
      { column: "to_user", table: "chat_rooms" },
      { column: "last_sent_user", table: "chat_rooms" },
    ],
  },
  {
    name: "chat_messages",
    columns: [
      { name: "message", type: "text", notNull: true, defaultValue: "" },
      { name: "from", type: "link", link: { table: "users" } },
      { name: "to", type: "link", link: { table: "users" } },
      {
        name: "is_deleted",
        type: "bool",
        notNull: true,
        defaultValue: "false",
      },
    ],
  },
  {
    name: "customer_requests",
    columns: [
      { name: "title", type: "text", notNull: true, defaultValue: "null" },
      {
        name: "pickupLocation",
        type: "text",
        notNull: true,
        defaultValue: "null",
      },
      {
        name: "dropoffLocation",
        type: "text",
        notNull: true,
        defaultValue: "null",
      },
      { name: "additionalNotes", type: "text" },
      { name: "customerId", type: "link", link: { table: "users" } },
      { name: "type", type: "text" },
      { name: "status", type: "text" },
      { name: "preferredGender", type: "text" },
    ],
    revLinks: [{ column: "customerRequestId", table: "job_applications" }],
  },
  {
    name: "driver_offers",
    columns: [
      { name: "title", type: "text", notNull: true, defaultValue: "null" },
      { name: "fee", type: "float", notNull: true, defaultValue: "0" },
      {
        name: "availableUntil",
        type: "datetime",
        notNull: true,
        defaultValue: "now",
      },
      { name: "location", type: "text", notNull: true, defaultValue: "null" },
      { name: "additionalNotes", type: "text" },
      { name: "driverId", type: "link", link: { table: "users" } },
      { name: "type", type: "text" },
      { name: "status", type: "text" },
    ],
    revLinks: [{ column: "driverOfferId", table: "job_applications" }],
  },
  {
    name: "job_applications",
    columns: [
      { name: "status", type: "text", notNull: true, defaultValue: "null" },
      { name: "driverOfferId", type: "link", link: { table: "driver_offers" } },
      {
        name: "customerRequestId",
        type: "link",
        link: { table: "customer_requests" },
      },
      { name: "applicantId", type: "link", link: { table: "users" } },
    ],
  },
  {
    name: "chat_rooms",
    columns: [
      { name: "last_message", type: "text", notNull: true, defaultValue: "" },
      { name: "from_user", type: "link", link: { table: "users" } },
      { name: "to_user", type: "link", link: { table: "users" } },
      { name: "last_sent_user", type: "link", link: { table: "users" } },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Users = InferredTypes["users"];
export type UsersRecord = Users & XataRecord;

export type ChatMessages = InferredTypes["chat_messages"];
export type ChatMessagesRecord = ChatMessages & XataRecord;

export type CustomerRequests = InferredTypes["customer_requests"];
export type CustomerRequestsRecord = CustomerRequests & XataRecord;

export type DriverOffers = InferredTypes["driver_offers"];
export type DriverOffersRecord = DriverOffers & XataRecord;

export type JobApplications = InferredTypes["job_applications"];
export type JobApplicationsRecord = JobApplications & XataRecord;

export type ChatRooms = InferredTypes["chat_rooms"];
export type ChatRoomsRecord = ChatRooms & XataRecord;

export type DatabaseSchema = {
  users: UsersRecord;
  chat_messages: ChatMessagesRecord;
  customer_requests: CustomerRequestsRecord;
  driver_offers: DriverOffersRecord;
  job_applications: JobApplicationsRecord;
  chat_rooms: ChatRoomsRecord;
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
