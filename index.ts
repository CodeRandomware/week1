import { DefaultContext, DefaultState, ParameterizedContext } from "koa";

// imports
const Koa = require("koa");
const Router = require("koa-router");
const json = require("koa-json");

// declare const
const port = 5000;
const app = new Koa();
const router = new Router();

// midleware
app.use(router.routes());
app.use(json())

// endpoints
router.get(
  "/",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    ctx.body = { msg: "Hi There!" };
  }
);

// server
app.listen(port, "localhost", () =>
  console.log(`Server is listening on port ${port}...`)
);
