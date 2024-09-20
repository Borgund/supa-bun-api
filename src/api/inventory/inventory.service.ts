import { Product } from "./../products/products.schema";
import { db } from "@db";
import { inventoryTable, productsTable } from "@db/schema";
import { asc, between, sql, eq, getTableColumns } from "drizzle-orm";
import type { InventoryInsert, Inventory } from "./inventory.schema";

export async function createInventoryItem(inventory: InventoryInsert) {
  return db.insert(inventoryTable).values(inventory).returning();
}

export async function getInventory(): Promise<Array<Inventory>> {
  return db.select().from(inventoryTable);
}
export async function getInventoryById(
  id: Inventory["id"]
): Promise<Array<Inventory>> {
  return db.select().from(inventoryTable).where(eq(inventoryTable.id, id));
}

export async function getNewProducts(): Promise<Array<Inventory>> {
  return db
    .select()
    .from(inventoryTable)
    .where(
      between(
        inventoryTable.createdAt,
        sql`now() - interval '1 day'`,
        sql`now()`
      )
    )
    .orderBy(asc(inventoryTable.createdAt))
    .limit(100);
}
type InventoryWithProduct = {
  id: Inventory["id"];
  productId: Product["id"];
  quantity: Inventory["quantity"];
  createdAt: Inventory["createdAt"];
  updatedAt: Inventory["updatedAt"];
  title: Product["description"] | null;
  description: Product["description"] | null;
  price: Product["price"] | null;
  category: Product["category"] | null;
}[];
export async function getInventoryWithProducts(): Promise<InventoryWithProduct> {
  return db
    .select({
      id: inventoryTable.id,
      productId: inventoryTable.productId,
      quantity: inventoryTable.quantity,
      createdAt: inventoryTable.createdAt,
      updatedAt: inventoryTable.updatedAt,
      title: productsTable.title,
      description: productsTable.description,
      price: productsTable.price,
      category: productsTable.category,
    })
    .from(inventoryTable)
    .leftJoin(productsTable, eq(inventoryTable.productId, productsTable.id));
}

export async function updateInventoryItem(
  productId: Inventory["productId"],
  quantity: InventoryInsert["quantity"]
) {
  return db
    .update(inventoryTable)
    .set({ quantity })
    .where(eq(inventoryTable.productId, productId))
    .returning();
}

export async function deleteInventoryItemById(id: Inventory["id"]) {
  return db.delete(inventoryTable).where(eq(inventoryTable.id, id)).returning();
}

export async function deleteInventoryItemByProductID(
  productId: Inventory["productId"]
) {
  return db
    .delete(inventoryTable)
    .where(eq(inventoryTable.productId, productId))
    .returning();
}
