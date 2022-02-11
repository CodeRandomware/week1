import { Context } from "koa";
/// import modules
const Koa = require("koa");
const Router = require("koa-router");
const json = require("koa-json");
const bodyParser = require("koa-bodyparser");
import * as userx from "./functions";
require("dotenv").config();

/// declare const
const app = new Koa();
const route = new Router();
const port = process.env.PORT;

/// add middleware
app.use(json());
app.use(bodyParser());

// routes
app.use(route.routes()).use(route.allowedMethods());

// login homepage
route.get("/", async (ctx: Context) => {
  ctx.response.status = 200;
  ctx.body = "<h1> Home Page </h1>";
});

// all users
route.get("/users", async (ctx: Context) => {
  ctx.response.status = 200;
  ctx.body = userx.users;
});

// single user
route.get("/users/:id", async (ctx: Context) => {
  const singleUser = userx.findUser(Number(ctx.params.id));
  if (!singleUser) {
    ctx.response.status = 404;
    ctx.body = {
      message: '<h1> User not found </h1> <a href="/users"> back to home </a>',
    };
  } else {
    ctx.response.status = 200;
    ctx.body = { singleUser };
  }
});

// user signup
route.post("/users/login", async (ctx: Context) => {
  const { fname, lname } = ctx.request.body;
  ctx.response.status = 200;
  ctx.body = {
    message: `Hello ${fname} ${lname} \n\n <a href="/users"> back to home </a>`,
  };
  userx.addUser(fname, lname);
});

// update user
route.put("/users/:id", async (ctx: Context) => {
  const singleUser = userx.findUser(Number(ctx.params.id));
  if (!singleUser) {
    ctx.response.status = 404;
    ctx.body = {
      message: '<h1> User not found </h1> <a href="/users"> back to home </a>',
    };
  } else {
    const { fname, lname } = ctx.request.body;
    const { id } = singleUser;
    userx.updateUser(fname, lname, id);
    ctx.response.status = 200;
    ctx.body = { singleUser };
  }
});

// delete user
route.delete("/users/:id", async (ctx: Context) => {
  const singleUser = userx.findUser(Number(ctx.params.id));
  if (!singleUser) {
    ctx.response.status = 404;
    ctx.body = {
      message: '<h1> User not found </h1> <a href="/users"> back to home </a>',
    };
  } else {
    userx.deleteUser(singleUser.id);
    ctx.response.status = 200;
    ctx.body = { singleUser };
  }
});

//open server
app.listen(port, "localhost", () =>
  console.log(`Server is listening on port ${port}...`)
);
