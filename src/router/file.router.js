const Router = require("koa-router");

const { avatorHandler } = require("../middleware/file.middleware");

const { verifyAuth } = require("../middleware/auth.middleware");

const { saveAvatorInfo } = require("../controller/file.controller");

const fileRouter = new Router({
  prefix: "/upload",
});

fileRouter.post("/avator", verifyAuth, avatorHandler, saveAvatorInfo);

module.exports = fileRouter;
