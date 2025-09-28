const { validationResult } = require("express-validator");
const ErrorHandler = require("../../utils/extra/errorHandler");
const { errorLog } = require("../../utils/extra/logs");

module.exports.helperErrorLogMiddleware = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors = result.array().map((item) => {
      errorLog(item.msg);
      return item.msg;
    });
    return next(new ErrorHandler(errors[0], 400));
  }

  next();
};
