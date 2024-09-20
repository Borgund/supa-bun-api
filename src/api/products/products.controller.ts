import { Elysia, t } from "elysia";
import {
  createProduct,
  deleteAllProducts,
  deleteProduct,
  getProductById,
  getProducts,
  getProductsByCategory,
} from "./products.service";

export const productsController = new Elysia({ prefix: "/products" })
  .get(
    "/:id?",
    async ({ params: { id }, query: { category } }) => {
      if (id) {
        return getProductById(id);
      }
      if (category) {
        return getProductsByCategory(category);
      }
      return getProducts();
    },
    {
      params: t.Object({ id: t.Optional(t.Number()) }),
      query: t.Object({ category: t.Optional(t.String()) }),
    }
  )
  .post(
    "",
    async ({ body, set }) => {
      console.log(body);
      const { title, description, category, price } = body;
      if (!body) return { message: "Please provide a body", status: 400 };
      const result = createProduct({
        title,
        description,
        category,
        price,
      });
      if ((await result).length > 0) {
        set.status = 201;
      }
      return result;
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.String(),
        category: t.String(),
        price: t.Number(),
      }),
    }
  )
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      return deleteProduct(id);
      return { message: `Product with id ${id} deleted` };
    },
    { params: t.Object({ id: t.Number() }) }
  )
  .get(
    "/category",
    async ({ query: { category } }) => {
      if (category) {
        return getProductsByCategory(category);
      }
      return;
    },
    { query: t.Object({ category: t.String() }) }
  )
  .delete("/all", async () => {
    return deleteAllProducts(true);
  });
