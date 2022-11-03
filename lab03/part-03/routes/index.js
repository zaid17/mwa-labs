const express = require("express");
const controller=require('../controller');
const router = express.Router();

router.get("/data",controller.getAllGames);


module.exports=router;
