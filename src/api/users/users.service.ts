import { asc, between, count, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "@db";
import { usersTable } from "@db/schema";
import type { UserInsert, User } from "./users.schema";

export async function createUser(user: UserInsert) {
  return db.insert(usersTable).values(user);
}

export async function getUserById(id: User["id"]): Promise<Array<User>> {
  return db.select().from(usersTable).where(eq(usersTable.id, id));
}

export async function getUserByEmail(
  email: User["email"]
): Promise<Array<User>> {
  return db.select().from(usersTable).where(eq(usersTable.email, email));
}

export async function deleteUserById(id: User["id"]) {
  return db.delete(usersTable).where(eq(usersTable.id, id));
}

export async function deleteUserByEmail(email: User["email"]) {
  return db.delete(usersTable).where(eq(usersTable.email, email));
}
