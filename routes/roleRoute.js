const express = require("express");
const router = express.Router();

const {
  createRole,
  getAllRoles,
  getRoleByValue,
} = require("../controllers/roleController");

router.post("/roles/new", createRole);
router.get("/roles/all", getAllRoles);

router.get("/role/:value", getRoleByValue);

module.exports = router;
