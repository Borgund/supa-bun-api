import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { type Static } from "elysia";
import { productsTable } from "@db/schema";

export const productInsert = createInsertSchema(productsTable);
export const productSelect = createSelectSchema(productsTable);

export type ProductInsert = Static<typeof productInsert>;
export type Product = Static<typeof productSelect>;
