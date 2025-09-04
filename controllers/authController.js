const asyncErrorHandler = require("../middlewares/errors/asyncErrorHandler");

module.exports.registration = asyncErrorHandler((req, res, next) => {
  res.json({ message: "User registration controller" });
});
