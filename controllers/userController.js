const asyncErrorHandler = require("../middlewares/errors/asyncErrorHandler");

module.exports.uploadUserAvatar = asyncErrorHandler(async (req, res, next) => {
  console.log(req.file);

  res.status(200).json({ status: "success" });
});
