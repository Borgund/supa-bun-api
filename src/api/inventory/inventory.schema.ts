import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { type Static } from "elysia";
import { inventoryTable } from "@db/schema";

export const inventoryInsert = createInsertSchema(inventoryTable);
export const inventorySelect = createSelectSchema(inventoryTable);

export type InventoryInsert = Static<typeof inventoryInsert>;
export type Inventory = Static<typeof inventorySelect>;
