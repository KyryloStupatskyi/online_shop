const asyncErrorHandler = require("../middlewares/errors/asyncErrorHandler");
const userService = require("../services/userService");
const tokenService = require("../services/tokenService");
const bcryptService = require("../services/bcryptService");
const ErrorHandler = require("../utils/extra/errorHandler");

module.exports.registration = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const { user, role } = await userService.createUser(email, password);
  const { accessToken, refreshToken } = tokenService.generateTokens({
    id: user.id,
    email: user.email,
    role: role.value,
  });

  await tokenService.saveRefreshTokenToDb(user, refreshToken);

  return res
    .cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: false,
    })
    .status(201)
    .json({
      message: "User successfully registered",
      accessToken,
    });
});

module.exports.login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);

  const checkIsPasswordCorrect = await bcryptService.comparePassword(password, user.password, user.salt);

  if (!checkIsPasswordCorrect) {
    throw new ErrorHandler("Incorrect password", 400);
  }

  const roles = user.roles.map((item) => item.value);

  const { accessToken, refreshToken } = tokenService.generateTokens({
    id: user.id,
    email: user.email,
    roles,
    avatarUrl: user.avatarUrl ? user.avatarUrl : null,
    avatarId: user.avatarId ? user.avatarId : null,
  });

  await tokenService.saveRefreshTokenToDb(user, refreshToken);

  return res
    .cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: false,
    })
    .status(201)
    .json({
      message: "User successfully logged in",
      accessToken,
    });
});

module.exports.refresh = asyncErrorHandler(async (req, res, next) => {
  const user = req.user;

  const { accessToken, refreshToken } = tokenService.generateTokens({
    id: user.id,
    email: user.email,
    roles: user.roles,
  });

  await tokenService.saveRefreshTokenToDb(user, refreshToken);

  return res
    .cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: false,
    })
    .status(201)
    .json({
      message: "Refresh token successfully refreshed!",
      accessToken,
    });
});
