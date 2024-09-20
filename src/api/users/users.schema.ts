import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { type Static } from "elysia";
import { usersTable } from "@db/schema";

export const userInsert = createInsertSchema(usersTable);
export const userSelect = createSelectSchema(usersTable);

export type UserInsert = Static<typeof userInsert>;
export type User = Static<typeof userSelect>;
