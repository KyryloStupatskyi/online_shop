const express = require("express");
const router = express.Router();

const {
  createRole,
  getAllRoles,
  getRoleByValue,
} = require("../controllers/roleController");
const {
  createRoleValidator,
  getRoleValidator,
} = require("../middlewares/validators/roleValidatorMiddleware");

router.post("/roles/new", createRoleValidator, createRole);
router.get("/roles/all", getAllRoles);

router.get("/role/:value", getRoleValidator, getRoleByValue);

module.exports = router;
