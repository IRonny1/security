const jwt = require("jsonwebtoken");

const { accessSecret } = require("../../config");

const HttpError = require("../exceptions/HttpError");

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw HttpError.UnauthorizedAccess();
    }

    const { roles: userRoles } = jwt.verify(token, accessSecret);
    let hasRole = false;
    userRoles.forEach((role) => {
      if (roles.includes(role)) hasRole = true;
    });

    if (!hasRole) {
      throw HttpError.AccessDenied();
    }

    next();
  };
};
