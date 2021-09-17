const fs = require("fs");
const { UPLOADS_PICTURE } = require("../constants/file-types");
const fileService = require("../service/file.service");
const service = require("../service/moment.service");
class MomentController {
  async create(ctx, next) {
    const { id } = ctx.userInfo;
    const { content } = ctx.request.body;
    const results = await service.create(id, content);
    if (results.length)
      ctx.body = {
        code: 0,
        message: "发表动态成功",
      };
  }

  async querySingle(ctx, next) {
    const { momentId } = ctx.params;
    console.log("ctx.params", ctx.params);
    const [[result]] = await service.getSingle(momentId);
    if (result) {
      ctx.body = {
        code: 0,
        result,
      };
    }
  }

  async queryMulti(ctx, next) {
    const { pagesize, offset } = ctx.query;
    const [result] = await service.getMulti(pagesize, offset);
    if (result) {
      ctx.body = {
        code: 0,
        result,
      };
    }
  }

  async alter(ctx, next) {
    console.log("alter");
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    console.log("momentId", momentId, content);
    const result = await service.update(content, momentId);
    if (result.length) {
      ctx.body = {
        code: 0,
        result: "修改动态成功",
      };
    }
  }

  async deleteSingle(ctx, next) {
    console.log("delete a moment");
    const { momentId } = ctx.params;
    const result = await service.deleteSingle(momentId);
    if (result.length) {
      ctx.body = {
        code: 0,
        result: "删除动态成功",
      };
    }
  }

  async addLabels(ctx, next) {
    const { labelList } = ctx;
    const { momentId } = ctx.params;

    for (let labelItem of labelList) {
      const hasLabel = await service.hasLabel(momentId, labelItem.label_id);
      if (!hasLabel) {
        const result = await service.addLabel(momentId, labelItem.label_id);
        console.log("addLabel_result", result);
      }
    }

    ctx.body = {
      code: 0,
      message: "添加成功",
    };
  }

  async getFileInfo(ctx, next) {
    let { fileName } = ctx.params;
    const { type } = ctx.query;
    const fileInfo = await fileService.getFileInfo(fileName);
    if (["small", "middle", "large"].some((item) => item == type)) {
      fileName = fileName + "-" + type;
    }
    console.log('fileName',fileName)
    if (fileInfo) {
      ctx.response.set("content-type", fileInfo.mimetype);
      ctx.body = fs.createReadStream(`${UPLOADS_PICTURE}/${fileName}`);
    }
  }
}

module.exports = new MomentController();
