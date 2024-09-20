import { Elysia, t } from "elysia";
import {
  getInventory,
  createInventoryItem,
  getInventoryWithProducts,
  getInventoryById,
  getNewProducts,
} from "./inventory.service";

export const inventoryController = new Elysia({ prefix: "/inventory" })
  .get(
    "/:id?",
    async ({ params: { id }, query: { filter } }) => {
      if (id) {
        return getInventoryById(id);
      }
      if (filter === "new") {
        return getNewProducts();
      }
      return getInventoryWithProducts();
    },
    {
      params: t.Object({ id: t.Optional(t.Number()) }),
      query: t.Object({ filter: t.Optional(t.String()) }),
    }
  )
  .post(
    "",
    async ({ body, set }) => {
      console.log(body);
      const { productId, quantity } = body;
      if (!body) return { message: "Please provide a body", status: 400 };
      const result = createInventoryItem({ productId, quantity });
      if ((await result).length > 0) {
        set.status = 201;
      }
      return result;
    },
    {
      body: t.Object({
        productId: t.Number(),
        quantity: t.Number(),
      }),
    }
  );
