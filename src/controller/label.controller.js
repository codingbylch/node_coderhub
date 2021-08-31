const service = require("../service/label.service");
class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body;
    const result = await service.create(name);
    console.log("result", result);
    ctx.body = {
      code: 0,
      message: "新增标签成功",
    };
  }

  async list(ctx, next) {
    const { limit, offset } = ctx.query;
    console.log("limit, offset", limit, offset);
    const result = await service.queryList(offset, limit);
    ctx.body = {
      result,
    };
  }
}

module.exports = new LabelController();
