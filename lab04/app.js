const express = require('express');
const path = require("path");
require("dotenv").config();

const routes= require("./routes");
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 
app.use((req,res,next)=>{
    console.log(req.url);
    next();
});

require('./db').open();

app.use('/api',routes);

app.listen(3000);


//export db to json
//mongoexport --db SchoolDB --collection students --out output/students.json