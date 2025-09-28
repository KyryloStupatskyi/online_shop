const tokenService = require("../../services/tokenService");
const ErrorHandler = require("../../utils/extra/errorHandler");

module.exports.validateRefreshTokenMiddleware = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      next(new ErrorHandler("Refresh token is missing, please log in.", 400));
    }

    const decodeToken = tokenService.validateRefreshToken(refreshToken);

    req.user = decodeToken;

    next();
  } catch (error) {
    next(new ErrorHandler("Invalid refresh token, please log in.", 401));
  }
};
