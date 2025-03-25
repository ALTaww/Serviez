import { IServiceVariant } from "./database";

export type SERVICE_VARIANT_OMIT = Omit<
  IServiceVariant,
  "_id" | "employee" | "service"
>;
