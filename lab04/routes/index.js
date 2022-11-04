const express = require("express");
const controller=require('../controller');
const router = express.Router();

router.get("/games",controller.games);

module.exports=router;
