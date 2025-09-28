const asyncErrorHandler = require("../middlewares/errors/asyncErrorHandler");
const cloudinaryService = require("../services/cloudinaryService");
const userService = require("../services/userService");

module.exports.uploadUserAvatar = asyncErrorHandler(async (req, res, next) => {
  const user = await userService.getUserById(req.user.id);

  const file = req.file;

  if (user.avatarId && user.avatarUrl) {
    await cloudinaryService.removeImage(user.avatarId);
  }

  const { public_id, secure_url } = await cloudinaryService.uploadImage(file.buffer, "avatars");

  user.avatarId = public_id;
  user.avatarUrl = secure_url;

  await user.save();

  res.status(200).json({
    status: "success",
    message: user.avatarId ? "Avatar successfully updated!" : "Avatar successfully uploaded!",
    avatarUrl: secure_url,
  });
});

// Update this method with microservice notification later!

module.exports.updateUserPassword = asyncErrorHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const { user } = req;

  console.log(currentPassword, newPassword);

  await userService.updateUserPassword(currentPassword, newPassword, user);

  res.status(200).json({
    message: "Password successfully updated!",
  });
});
