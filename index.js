require("dotenv").config();

const express = require("express");
const { port, dbUri } = require("./config");
const mongoose = require("mongoose");

const app = express();

const user = require("./src/routers/userRoute");
const role = require("./src/routers/roleRoute");

app.use(express.json());

// SERVER

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});

// REQUESTS

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// DATABASE

mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch(() => {
    console.log("Database not connected.");
  });

// ROUTES

app.use("/api/user", user);
app.use("/api/role", role);
