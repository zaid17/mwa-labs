const express = require("express");
require("dotenv").config();
const routes= require("./routes");

const path = require("path");

const app = express();

const server = app.listen(process.env.PORT, () => {
  const port = server.address().port;
});

app.use(express.static(path.join(__dirname, "public")));
app.use('/api',routes);

