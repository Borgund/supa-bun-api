import { Elysia, t } from "elysia";

export const usersController = new Elysia({ prefix: "/users" })
  .get("", async () => {
    return { message: "Hello, World!" };
  });
