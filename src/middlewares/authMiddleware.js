const jwt = require("jsonwebtoken");

const SECRET_TOKEN = process.env.SECRET_TOKEN;

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Unauthorized access." });
    }

    req.user = jwt.verify(token, SECRET_TOKEN);

    next();
  } catch (e) {
    return res.status(403).json({ message: "Unauthorized access." });
  }
};
