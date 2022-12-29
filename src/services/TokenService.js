const jwt = require("jsonwebtoken");

const Token = require("../models/Token");
const { secretToken } = require("../../config");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, secretToken, { expiresIn: "1h" });
    const refreshToken = jwt.sign(payload, secretToken, { expiresIn: "1h" });

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
}

module.exports = new TokenService();
