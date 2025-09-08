const tokenService = require("../../services/tokenService");

const validateAccessTokenMiddleware = (req, res, next) => {
  try {
    const { accessToken } = req.headers.authorization;

    if (!accessToken) {
      return res.status(401).json({ message: "Access token is missing, please log in." });
    }

    const decodeToken = tokenService.validateAccessToken(accessToken);

    req.user = decodeToken;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid access token, please log in." });
  }
};

module.exports = validateAccessTokenMiddleware;
