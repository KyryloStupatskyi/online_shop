const { body, param } = require("express-validator");
const { helperErrorLogMiddleware } = require("./helperErrorLogMiddleware");

module.exports.createRoleValidator = [
  body("roleValue")
    .notEmpty()
    .withMessage("Role value field is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Role value must be between 3 and 20 characters"),

  helperErrorLogMiddleware,
];

module.exports.getRoleValidator = [
  param("value")
    .notEmpty()
    .withMessage("Role value is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Role value must be between 3 and 20 characters"),

  helperErrorLogMiddleware,
];
