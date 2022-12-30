const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT || 8080;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

module.exports = {
  dbUri: DB_URI,
  port: PORT,
  accessSecret: JWT_ACCESS_SECRET,
  refreshSecret: JWT_REFRESH_SECRET,
};
