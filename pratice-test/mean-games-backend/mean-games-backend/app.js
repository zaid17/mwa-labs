const express = require("express");
const cors = require("cors");
require("dotenv").config();
require('./db');
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const routes = require("./routes");

app.use("/api/games", routes);
app.use((req, res, next) => {
  console.log(req.method, req.url, req.params, req.body, req.query);
  next();
});

app.listen(3000);
