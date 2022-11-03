const express = require("express");
const controller=require('../controller');
const router = express.Router();

router.post("/",controller.handelPostRequests);


module.exports=router;
