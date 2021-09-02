const Multer = require("koa-multer");
const { UPLOADS_AVATOR } = require("../constants/file-types");

const avatorUpload = Multer({
  dest: UPLOADS_AVATOR,
});

const avatorHandler = avatorUpload.single("avator");

module.exports = {
  avatorHandler,
};
