const asyncErrorHandler = require("../middlewares/errors/asyncErrorHandler");
const userService = require("../services/userService");
const tokenService = require("../services/tokenService");

module.exports.registration = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userService.createUser(email, password);
  const { accessToken, refreshToken } = tokenService.generateTokens({
    id: user.id,
    email: user.email,
  });

  tokenService.saveRefreshTokenToDb(user, refreshToken);

  return res.status(201).json({
    message: "User successfully registered",
    accessToken,
    refreshToken,
  });
});
