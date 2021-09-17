const Router = require("koa-router");

const { avatorHandler, pictureHandler, pictureResize } = require("../middleware/file.middleware");

const { verifyAuth } = require("../middleware/auth.middleware");

const { saveAvatorInfo, savePicInfo } = require("../controller/file.controller");

const fileRouter = new Router({
  prefix: "/upload",
});

fileRouter.post("/avator", verifyAuth, avatorHandler, saveAvatorInfo);
fileRouter.post("/picture", verifyAuth, pictureHandler, pictureResize, savePicInfo);

module.exports = fileRouter;
