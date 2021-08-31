const service = require("../service/auth.service");
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");
class AuthController {
  async login(ctx, next) {
    const { id, name: username } = ctx.userInfo;
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });
    ctx.body = {
      code: 0,
      message: `登录成功，欢迎${username}回来`,
      username,
      token,
    };
  }

  async success(ctx, next) {
    ctx.body = {
      code: 0,
      message: `验证${ctx.userInfo.username}身份成功`,
    };
  }
}

module.exports = new AuthController();
