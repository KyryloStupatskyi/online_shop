const express = require("express");
const router = express.Router();

const { createRole } = require("../controllers/roleController");

router.post("/role/new", createRole);

module.exports = router;
