const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();

const { uploadUserAvatar } = require("../controllers/userController");
const { uploadFileValidator } = require("../middlewares/validators/uploadFileValidator");
const { validateAccessTokenMiddleware } = require("../middlewares/tokens/validateAccessTokenMiddleware");

router.patch(
  "/user/settings/add-avatar",
  validateAccessTokenMiddleware,
  upload.single("avatar"),
  uploadFileValidator,
  uploadUserAvatar
);

module.exports = router;
