const fs = require("fs");
const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { UPLOADS_AVATOR } = require("../constants/file-types");
const { APP_PORT, APP_HOST } = require("../app/config");
class FileController {
  async saveAvatorInfo(ctx, next) {
    // 获取文件信息
    const { filename, mimetype, size } = ctx.req.file;
    const { id: user_id } = ctx.userInfo;
    console.log("object", filename, mimetype, size, user_id);
    // 存储图片信息到数据库中
    const result = await fileService.saveAvatorInfo(filename, mimetype, size, user_id);
    // 图片地址保存在user表中
    const avatorUrl = `${APP_HOST}:${APP_PORT}/users/${user_id}/avator`;
    await userService.updateAvatorUrlById(user_id, avatorUrl);
    // 返回结果
    if (result) {
      ctx.body = {
        code: 0,
        message: "图片添加成功",
      };
    }
  }

  async getAvatorInfo(ctx, next) {
    const { userId } = ctx.params;
    const avatorInfo = await fileService.getAvatorInfo(userId);
    if (avatorInfo) {
      ctx.response.set("content-type", avatorInfo.mimetype);
      ctx.body = fs.createReadStream(`${UPLOADS_AVATOR}/${avatorInfo.filename}`);
    }
  }

  async savePicInfo(ctx, next) {
    const { files } = ctx.req;
    const { id: user_id } = ctx.userInfo;
    const { momentId: moment_id } = ctx.query;
    console.log("files", files, user_id, moment_id);
    for (let file of files) {
      const { filename, mimetype, size } = file;
      await fileService.createFile(filename, mimetype, size, moment_id, user_id);
    }

    ctx.body = {
      code: 0,
      message: "图片上传成功",
    };
  }
}

module.exports = new FileController();
