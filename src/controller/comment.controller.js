const service = require("../service/comment.service");
class CommentController {
  async create(ctx, next) {
    console.log("comment create.");
    const { id: user_id } = ctx.userInfo;
    const { content, moment_id } = ctx.request.body;
    console.log("content, moment_id", content, moment_id);
    const result = await service.create(content, moment_id, user_id);
    console.log("result", result);
    if (result.length) {
      ctx.body = {
        code: 0,
        message: "发表评论成功",
      };
    }
  }

  async reply(ctx, next) {
    const { commentId } = ctx.params;
    const { content, moment_id } = ctx.request.body;
    const { id: user_id } = ctx.userInfo;
    const result = await service.reply(content, moment_id, commentId, user_id);
    console.log("reply result", result);
    if (result.length) {
      ctx.body = {
        code: 0,
        message: "回复评论成功",
      };
    }
  }

  async update(ctx, next) {
    console.log("修改评论!");
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await service.update(content, commentId);
    if (result.length) {
      ctx.body = {
        code: 0,
        result: "修改评论成功",
      };
    }
  }

  async deleteSingle(ctx, next) {
    const { commentId } = ctx.params;
    const result = await service.deleteSingle(commentId);
    if (result.length) {
      ctx.body = {
        code: 0,
        result: "删除评论成功",
      };
    }
  }

  async querySingle(ctx, next) {
    const { momentId } = ctx.params;
    const [result] = await service.querySingle(momentId);
    if (result.length) {
      ctx.body = {
        code: 0,
        result,
      };
    }
  }
}

module.exports = new CommentController();
