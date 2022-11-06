const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
require('./db');

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
const routes = require("./routes");
require("./models/song");
app.use((req, _, next) => {
  console.log(req.url);
  next();
});
app.use("/api", routes);
app.listen(process.env.SERVER_PORT);
