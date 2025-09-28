const tokenService = require("../../services/tokenService");
const ErrorHandler = require("../../utils/extra/errorHandler");

module.exports.validateAccessTokenMiddleware = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];

    if (!accessToken) {
      next(new ErrorHandler("Access token is missing.", 400));
    }

    const decodeToken = tokenService.validateAccessToken(accessToken);

    req.user = decodeToken;

    next();
  } catch (error) {
    next(new ErrorHandler("Invalid access token, please log in.", 401));
  }
};
