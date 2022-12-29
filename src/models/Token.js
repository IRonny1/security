const { Schema, model } = require("mongoose");

const TokenSchema = new Schema({
  userId: { type: String, ref: "User" },
  refreshToken: { type: String, required: true },
});

const Token = model("Token", TokenSchema);

module.exports = Token;
