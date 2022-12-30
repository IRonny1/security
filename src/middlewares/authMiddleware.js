const jwt = require("jsonwebtoken");

const { accessSecret } = require("../../config");

const HttpError = require("../exceptions/HttpError");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(HttpError.UnauthorizedAccess());
    }

    req.user = jwt.verify(token, accessSecret);

    next();
  } catch (e) {
    next(HttpError.UnauthorizedAccess());
  }
};
