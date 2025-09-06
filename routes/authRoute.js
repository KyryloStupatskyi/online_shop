const express = require("express");
const router = express.Router();

const { registration, login } = require("../controllers/authController");
const { authValidator } = require("../middlewares/validators/authValidatorMiddleware");

router.post("/auth/registration", authValidator, registration);
router.post("/auth/login", login);

module.exports = router;
