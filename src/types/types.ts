import { IServiceVariant } from "./database";

export type SERVICE_VARIANT_CREATE = Omit<
  IServiceVariant,
  "_id" | "employee" | "service"
>;
