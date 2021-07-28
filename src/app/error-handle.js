const errorTypes = require("../constants/error-types");
const errorHandler = (error, ctx) => {
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      ctx.status = 401;
      ctx.body = {
        code: -1,
        message: "用户名或密码不能为空噢",
      };
      break;
    case errorTypes.NAME_HAS_BENN_REGISTERED:
      ctx.status = 401;
      ctx.body = {
        code: -1,
        message: "该用户名已被注册",
      };
      break;
    case errorTypes.NAME_HAS_NOT_REGISTERED:
      ctx.status = 401;
      ctx.body = {
        code: -1,
        message: "您还未注册，请注册后再登录",
      };
      break;
    case errorTypes.PASSWORD_WRONG:
      ctx.status = 401;
      ctx.body = {
        code: -1,
        message: "密码错误",
      };
      break;
    default:
      ctx.status = 404;
      ctx.body = {
        code: -123,
        message: "服务器存在错误，稍后再试",
      };
  }
};

module.exports = errorHandler;
