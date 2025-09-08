const asyncErrorHandler = require("../middlewares/errors/asyncErrorHandler");
const cloudinaryService = require("../services/cloudinaryService");

module.exports.uploadUserAvatar = asyncErrorHandler(async (req, res, next) => {
  const file = req.file;
  const result = await cloudinaryService.uploadImage(file.buffer, "avatars");

  console.log(result);

  res.status(200).json({ status: "success" });
});
