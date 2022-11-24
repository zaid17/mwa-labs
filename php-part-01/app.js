const cors = require('cors');
const express = require("express");
require("dotenv").config();
require("./db");
const app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
const routes = require("./routes");

require("./models/song");
require("./models/user");
app.use((req, _, next) => {
  console.log(req.method, req.url);
  next();
});
app.use("/api/songs", routes.songs);
app.use("/api/songs/:songId/artists", routes.artists);
app.use("/api/users", routes.users);
app.use("/api/auth", routes.auth);
app.use((req, res) => {
  res.status(404).json({ msg: "resource was not found." });
});

app.listen(process.env.SERVER_PORT);
