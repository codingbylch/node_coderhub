const service = require("../service/user.service");
const errorTypes = require("../constants/error-types");
const { md5password } = require("../utils/password-handle");
const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");
const serviceMoment = require("../service/moment.service");
const serviceAuth = require("../service/auth.service");

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  console.log("username,password", username, password);
  // 用户名、密码为空
  if (!username || password === md5password("")) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return await ctx.app.emit("error", error, ctx);
  }

  // 用户名不存在
  const result = await service.getUserByName(username);
  if (!result.length) {
    const error = new Error(errorTypes.NAME_HAS_NOT_REGISTERED);
    return await ctx.app.emit("error", error, ctx);
  }
  // 密码不一致
  console.log("username,password", username, password);
  const userInfoFromDatabase = result[0];
  if (userInfoFromDatabase.password !== password) {
    const error = new Error(errorTypes.PASSWORD_WRONG);
    return await ctx.app.emit("error", error, ctx);
  }
  console.log("userInfoFromDatabase", userInfoFromDatabase);
  ctx.userInfo = userInfoFromDatabase;
  await next();
};

const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware");
  const authorization = ctx.headers.authorization;
  // console.log("authorization", authorization);

  try {
    const result = jwt.verify(authorization, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.userInfo = result;
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return await ctx.app.emit("error", error, ctx);
  }
  await next();
};

const verrifyPermission = (tableName) => {
  return async (ctx, next) => {
    const { id } = ctx.userInfo;
    const [[result]] = await serviceAuth.checkResource(
      tableName,
      ctx.params[tableName + "Id"]
    );
    if (!result || result.id !== id) {
      const error = new Error(errorTypes.UNPERMISSION);
      return await ctx.app.emit("error", error, ctx);
    }
    await next();
  };
};

module.exports = {
  verifyLogin,
  verifyAuth,
  verrifyPermission,
};
