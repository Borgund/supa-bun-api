import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});

export const productsTable = pgTable("products_table", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("content").notNull(),
  category: text("category").notNull(),
  price: integer("price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const inventoryTable = pgTable("inventory_table", {
  id: serial("id").primaryKey(),
  quantity: integer("quantity").notNull(),
  productId: integer("product_id")
    .notNull()
    .references(() => productsTable.id)
    .unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
