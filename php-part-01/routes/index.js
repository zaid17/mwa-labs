const express = require("express");
const controller = require("../controller/songs");
const router = express.Router();

router.post("/add-song", controller.addSong);
router.get("/songs", controller.getSongs);
router.get("/songs/:songId", controller.getOneSong);
// router.post("/games",controller.addGame);
// router.delete("/games",controller.deleteGame);
module.exports = router;
