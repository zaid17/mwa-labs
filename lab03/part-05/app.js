const express = require('express');
const path = require("path");
const routes= require("./routes");
const app = express();

app.use('/api',routes);

app.listen(3000);