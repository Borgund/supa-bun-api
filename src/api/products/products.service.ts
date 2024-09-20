import { db } from "@db";
import { productsTable } from "@db/schema";
import { eq } from "drizzle-orm";
import type { ProductInsert, Product } from "./products.schema";
import { error } from "elysia";

export async function createProduct(
  product: ProductInsert
): Promise<Array<Product>> {
  return db.insert(productsTable).values(product).returning();
}

export async function getProducts(): Promise<Array<Product>> {
  return db.select().from(productsTable);
}

export async function getProductById(
  id: Product["id"]
): Promise<Array<Product>> {
  const result = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, id));
  if (result.length === 0) {
    throw error(404);
  }
  return result;
}

export async function getProductsByCategory(
  category: Product["category"]
): Promise<Array<Product>> {
  return db
    .select()
    .from(productsTable)
    .where(eq(productsTable.category, category));
}

export async function updateProduct(id: Product["id"], product: ProductInsert) {
  return db
    .update(productsTable)
    .set(product)
    .where(eq(productsTable.id, id))
    .returning();
}

export async function deleteProduct(id: Product["id"]) {
  return db.delete(productsTable).where(eq(productsTable.id, id)).returning();
}
export async function deleteAllProducts(really: boolean) {
  if (really) {
    return db.delete(productsTable).returning();
  }
}
