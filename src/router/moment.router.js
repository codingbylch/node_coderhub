const Router = require("koa-router");
const {
  create,
  querySingle,
  queryMulti,
  alter,
  deleteSingle,
  addLabels,
  getFileInfo,
} = require("../controller/moment.controller");
const { verifyAuth, verrifyPermission } = require("../middleware/auth.middleware");
const { verifyLabelExist } = require("../middleware/label.middleware");

const momentRouter = new Router({
  prefix: "/moment",
});

momentRouter.post("/", verifyAuth, create);

momentRouter.get("/", queryMulti);

momentRouter.get("/:momentId", querySingle);

momentRouter.patch("/:momentId", verifyAuth, verrifyPermission("moment"), alter); // 修改评论

momentRouter.delete("/:momentId", verifyAuth, verrifyPermission("moment"), deleteSingle);

momentRouter.post("/:momentId/labels", verifyAuth, verrifyPermission("moment"), verifyLabelExist, addLabels); // 给动态添加标签

momentRouter.get("/image/:fileName", getFileInfo);

module.exports = momentRouter;
