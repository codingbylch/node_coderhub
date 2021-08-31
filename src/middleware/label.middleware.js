const service = require("../service/label.service");

const verifyLabelExist = async (ctx, next) => {
  const { labels = "" } = ctx.request.body;
  const labelList = [];

  for (let item of labels) {
    const result = await service.query(item);
    let label_id = result && result.id;
    if (!result) {
      const newLabel = await service.create(item);
      label_id = newLabel.insertId;
    }
    labelList.push({
      labelName: item,
      label_id,
    });
  }
  ctx.labelList = labelList;
  await next();
};

module.exports = {
  verifyLabelExist,
};
