const service = require("../service/user.service");
class UserController {
  async create(ctx, next) {
    const userInfo = ctx.request.body;
    const results = await service.create(userInfo);
    ctx.body = results;
  }
}

module.exports = new UserController();
