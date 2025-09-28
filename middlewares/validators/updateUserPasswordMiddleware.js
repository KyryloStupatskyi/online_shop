const { body } = require("express-validator");
const { helperErrorLogMiddleware } = require("./helperErrorLogMiddleware");

module.exports.updateUserPasswordValidator = [
  body("newPassword")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 30 })
    .withMessage("Password must be between 6 and 30 characters length")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),

  helperErrorLogMiddleware,
];
