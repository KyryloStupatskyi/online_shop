const express = require("express");
const router = express.Router();

const { registration } = require("../controllers/authController");

router.post("/registration", registration);

module.exports = router;
