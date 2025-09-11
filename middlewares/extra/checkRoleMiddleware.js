const ErrorHandler = require("../../utils/extra/errorHandler");

module.exports = (...requiredRole) => {
  return (req, res, next) => {
    if (!req.user.roles.some((role) => requiredRole.includes(role))) {
      next(new ErrorHandler("Access denied: insufficient rights", 403));
    }

    next();
  };
};
