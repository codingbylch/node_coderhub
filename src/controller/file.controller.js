const fs = require("fs");
const service = require("../service/file.service");
const { UPLOADS_AVATOR } = require("../constants/file-types");
class FileController {
  async saveAvatorInfo(ctx, next) {
    // 获取文件信息
    const { filename, mimetype, size } = ctx.req.file;
    const { id: user_id } = ctx.userInfo;
    // 存储图片信息到数据库中
    const result = await service.saveAvatorInfo(filename, mimetype, size, user_id);
    if (result) {
      ctx.body = {
        code: 0,
        message: "图片添加成功",
      };
    }
  }

  async getAvatorInfo(ctx, body) {
    const { userId } = ctx.params;
    const avatorInfo = await service.getAvatorInfo(userId);
    if (avatorInfo) {
      ctx.response.set("content-type", avatorInfo.mimetype);
      ctx.body = fs.createReadStream(`${UPLOADS_AVATOR}/${avatorInfo.filename}`);
    }
  }
}

module.exports = new FileController();
