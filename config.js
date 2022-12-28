const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT || 8080;
const SECRET_TOKEN = process.env.SECRET_TOKEN;

module.exports = {
  dbUri: DB_URI,
  port: PORT,
  secretToken: SECRET_TOKEN,
};
