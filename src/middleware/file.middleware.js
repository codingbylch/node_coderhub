const Multer = require("koa-multer");
const { UPLOADS_AVATOR, UPLOADS_PICTURE } = require("../constants/file-types");
const path = require("path");
const Jimp = require("jimp");

const avatorUpload = Multer({
  dest: UPLOADS_AVATOR,
});

const pictureUpload = Multer({
  dest: UPLOADS_PICTURE,
});

const avatorHandler = avatorUpload.single("avator");
const pictureHandler = pictureUpload.array("picture", 9);

const pictureResize = async (ctx, next) => {
  try {
    const files = ctx.req.files;
    for (let file of files) {
      const destPath = path.join(file.destination, file.filename);
      Jimp.read(file.path).then((image) => {
        image.resize(1280, Jimp.AUTO).write(`${destPath}-large`);
        image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
        image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
      });
    }
    await next();
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  avatorHandler,
  pictureHandler,
  pictureResize,
};
