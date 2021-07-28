const Router = require("koa-router");
const { handlePassword } = require("../middleware/user.middleware");

const { verifyLogin } = require("../middleware/auth.middleware");

const authRouter = new Router();

const { login } = require("../controller/auth.controller");

authRouter.post("/login",  handlePassword, verifyLogin, login);

module.exports = authRouter;
