const Router = require("koa-router");
const { create } = require("../controller/user.controller");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");
const { getAvatorInfo } = require("../controller/file.controller");
const userRouter = new Router({
  prefix: "/users",
});

userRouter.post("/", verifyUser, handlePassword, create);

userRouter.get("/:userId/avator", getAvatorInfo);

module.exports = userRouter;
