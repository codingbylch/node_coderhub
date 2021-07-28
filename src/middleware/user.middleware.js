const errorTypes = require("../constants/error-types");
const service = require("../service/user.service");
const { md5password } = require("../utils/password-handle");
const verifyUser = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  // 判断用户名、密码为空
  if (!username || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return await ctx.app.emit("error", error, ctx);
  }
  // 判断是否已被注册
  const result = await service.getUserByName(username);
  if (result.length) {
    const error = new Error(errorTypes.NAME_HAS_BENN_REGISTERED);
    return await ctx.app.emit("error", error, ctx);
  }
  await next();
};

const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
