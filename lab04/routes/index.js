const express = require("express");
const controller=require('../controller');
const router = express.Router();

router.get("/games",controller.games);
router.post("/games",controller.addGame);
router.delete("/games",controller.deleteGame);
module.exports=router;
