const asyncErrorHandler = require("../middlewares/errors/asyncErrorHandler");
const userService = require("../services/userService");
const tokenService = require("../services/tokenService");
const bcryptService = require("../services/bcryptService");
const ErrorHandler = require("../utils/extra/errorHandler");

module.exports.registration = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const hashedPassword = await bcryptService.hashPassword(password);

  const user = await userService.createUser(email, hashedPassword);
  const { accessToken, refreshToken } = tokenService.generateTokens({
    id: user.id,
    email: user.email,
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

  const checkIsPasswordCorrect = await bcryptService.comparePassword(password, user.password);

  if (!checkIsPasswordCorrect) {
    throw new ErrorHandler("Incorrect password", 400);
  }

  const { accessToken, refreshToken } = tokenService.generateTokens({
    id: user.id,
    email: user.email,
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
