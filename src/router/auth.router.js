const Router = require("koa-router");
const { handlePassword } = require("../middleware/user.middleware");

const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware");

const authRouter = new Router();

const { login, success } = require("../controller/auth.controller");

authRouter.post("/login", handlePassword, verifyLogin, login);

authRouter.get("/query", verifyAuth, success);

module.exports = authRouter;
