const express = require("express");
const router = express.Router();
const controller = require("../controller/games");
router.route("/").get(controller.getGames).post(controller.addGame);
router.route("/search").get(controller.searchGamesByTitle);
router.route("/search-location").get(controller.searchGamesByLocation);
router.route("/:gameId").get(controller.getGame).delete(controller.deleteGame);

module.exports = router;
