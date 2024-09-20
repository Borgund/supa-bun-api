import Bun from "bun";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(Bun.env.DATABASE_URL!, { prepare: false });
export const db = drizzle(client);


/*
https://lucia-auth.com/database/drizzle

import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import pg from "pg";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

const pool = new pg.Pool();
const authDB = drizzle(pool);

const userTable = pgTable("user", {
  id: text("id").primaryKey(),
});

const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);
 */