const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const app = new Koa();

const userRouter = require("../router/user.router");
const authRouter = require('../router/auth.router')
const useRoutes = require('../router/index')

const errorHandler = require("./error-handle");

app.use(bodyParser());

useRoutes(app)

app.on("error", errorHandler);

module.exports = app;
