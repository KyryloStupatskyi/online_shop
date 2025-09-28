const asyncErrorHandler = require("../middlewares/errors/asyncErrorHandler");
const roleService = require("../services/roleService");
const { infoLog } = require("../utils/extra/logs");

module.exports.createRole = asyncErrorHandler(async (req, res, next) => {
  const { roleValue } = req.body;

  const newRole = await roleService.createRole(roleValue);

  return res.json({
    newRole,
  });
});

module.exports.getAllRoles = asyncErrorHandler(async (req, res, next) => {
  const roles = await roleService.getAllRoles();

  return res.json({
    roles,
  });
});

module.exports.getRoleByValue = asyncErrorHandler(async (req, res, next) => {
  const { value } = req.params;

  const role = await roleService.getRoleByValue(value);

  return res.json({
    role,
  });
});
