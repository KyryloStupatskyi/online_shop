const jsonwebtoken = require("jsonwebtoken");

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
}

module.exports = new TokenService();
