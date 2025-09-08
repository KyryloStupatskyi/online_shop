const express = require("express");
const router = express.Router();

const { registration, login, refresh } = require("../controllers/authController");
const { authValidator } = require("../middlewares/validators/authValidatorMiddleware");
const validateRefreshTokenMiddleware = require("../middlewares/tokens/validateRefreshTokenMiddleware");

router.post("/auth/registration", authValidator, registration);
router.post("/auth/login", login);
router.get("/auth/refresh", validateRefreshTokenMiddleware, refresh);

module.exports = router;
