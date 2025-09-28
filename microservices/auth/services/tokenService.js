const jsonwebtoken = require("jsonwebtoken");
const { RefreshToken } = require("../models/models");
const { infoLog } = require("../utils/extra/logs");
const userService = require("./userService");

class TokenService {
  generateTokens(tokenPayload) {
    const accessToken = jsonwebtoken.sign(
      tokenPayload,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      }
    );

    const refreshToken = jsonwebtoken.sign(
      tokenPayload,
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const decodedToken = jsonwebtoken.decode(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );

      return decodedToken;
    } catch (error) {
      throw error;
    }
  }

  validateRefreshToken(token) {
    try {
      const decodedToken = jsonwebtoken.decode(
        token,
        process.env.REFRESH_TOKEN_SECRET
      );

      return decodedToken;
    } catch (error) {
      throw error;
    }
  }

  async saveRefreshTokenToDb(user, token) {
    try {
      const tokenInDb = await RefreshToken.findOne({
        where: { userId: user.id },
      });

      if (tokenInDb) {
        tokenInDb.token = token;
        return tokenInDb.save();
      }

      const newToken = await user.createRefresh_token({ token });

      return newToken;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TokenService();
