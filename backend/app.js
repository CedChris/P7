const express = require("express");
const cors = require("cors");
const app = express();
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const userRoutes = require("./routes/user.route");
const messageRoutes = require("./routes/message.route");

require("dotenv").config({ path: "./config/.env" });
const db = require("./database/db");

app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/image", express.static(path.join(__dirname, "image")));

app.use("/user", userRoutes);
app.use("/message", messageRoutes);

module.exports = app;
