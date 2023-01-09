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

    const user = jwt.verify(token, accessSecret);
    const { roles: userRoles } = user;
    let hasRole = false;
    userRoles.forEach((role) => {
      if (roles.includes(role)) hasRole = true;
    });

    if (!hasRole) {
      throw HttpError.AccessDenied();
    }

    req.user = user;

    next();
  };
};
