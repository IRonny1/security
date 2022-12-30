const jwt = require("jsonwebtoken");

const Token = require("../models/Token");
const { accessSecret, refreshSecret } = require("../../config");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessSecret, { expiresIn: "1h" });
    const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: "1h" });

    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ userId: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    return await Token.create({ userId: userId, refreshToken: refreshToken });
  }

  async findToken(token) {
    return Token.findOne({ token });
  }

  async removeToken(refreshToken) {
    return Token.deleteOne({ refreshToken });
  }

  validateAccessToken(token) {
    return jwt.verify(token, accessSecret);
  }

  validateRefreshToken(token) {
    return jwt.verify(token, refreshSecret);
  }
}

module.exports = new TokenService();
