const asyncErrorHandler = require("../middlewares/errors/asyncErrorHandler");
const roleService = require("../services/roleService");

module.exports.createRole = asyncErrorHandler(async (req, res, next) => {
  const { roleValue } = req.body;

  const newRole = await roleService.createRole(roleValue);

  return res.json({
    newRole,
  });
});
