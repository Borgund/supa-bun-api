import Bun from "bun";
import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import {
  usersController,
  productsController,
  inventoryController,
} from "./api/routes";
import { logger } from "@bogeychan/elysia-logger";

const app = new Elysia({ prefix: "/api" })
  .use(cors())
  .onError(({ set, error }) => {
    set.headers["Content-Type"] = "application/json";
    return error;
  })
  .use(swagger())
  .use(logger({ level: "debug" }))
  .use(usersController)
  .use(productsController)
  .use(inventoryController)
  .all("*", ({ request, set }) => {
    console.info("Not Found", request);
    set.status = 404;
    return { message: "Not Found" };
  })
  .listen(Bun.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server!.hostname}:${app.server!.port}`
);
console.log(
  `View documentation at "${app.server!.url}api/swagger" in your browser`
);
