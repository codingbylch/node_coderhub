const Router = require("koa-router");
const { create, reply, update, deleteSingle,querySingle } = require("../controller/comment.controller");

const { verifyAuth, verrifyPermission } = require("../middleware/auth.middleware");

const commentRouter = new Router({
  prefix: "/comment",
});

commentRouter.post("/", verifyAuth, create);
commentRouter.post("/:commentId", verifyAuth, reply);
commentRouter.patch("/:commentId", verifyAuth, verrifyPermission("comment"), update);
commentRouter.delete("/:commentId", verifyAuth, verrifyPermission("comment"), deleteSingle);
commentRouter.get('/:momentId', querySingle)

module.exports = commentRouter;
