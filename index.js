require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { port, dbUri } = require("./config");

const app = express();

const user = require("./src/routers/userRoute");
const item = require("./src/routers/itemRoute");

const errorMiddleware = require("./src/middlewares/errorMiddleware");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(errorMiddleware);

// SERVER

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
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
app.use("/api/item", item);
