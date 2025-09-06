const express = require("express");
const router = express.Router();

const { registration } = require("../controllers/authController");

router.post("/auth/registration", registration);

module.exports = router;
