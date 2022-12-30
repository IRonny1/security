const jwt = require("jsonwebtoken");

const { accessSecret } = require("../../config");

const HttpError = require("../exceptions/HttpError");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    throw HttpError.UnauthorizedAccess();
  }

  req.user = jwt.verify(token, accessSecret);

  next();
};
