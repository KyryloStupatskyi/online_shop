const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();

const { uploadUserAvatar, updateUserPassword } = require("../controllers/userController");
const { uploadFileValidator } = require("../middlewares/validators/uploadFileValidator");
const { validateAccessTokenMiddleware } = require("../middlewares/tokens/validateAccessTokenMiddleware");
const { updateUserPasswordValidator } = require("../middlewares/validators/updateUserPasswordMiddleware");

router.patch(
  "/user/settings/add-avatar",
  validateAccessTokenMiddleware,
  upload.single("avatar"),
  uploadFileValidator,
  uploadUserAvatar
);

router.patch(
  "/user/settings/update-password",
  validateAccessTokenMiddleware,
  updateUserPasswordValidator,
  updateUserPassword
);

module.exports = router;
