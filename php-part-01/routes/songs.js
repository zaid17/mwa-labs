const express = require("express");
const songsController = require("../controller/songs");
const router = express.Router();
const authController = require("../controller/auth");
router.route("/").post(songsController.addOne).get(songsController.getSongs);
router
  .route("/:songId")
  .get(songsController.getOne)
  .delete(authController.authenticateToken,songsController.deleteSongById)
  .put(authController.authenticateToken,songsController.updateSong)
  .patch(authController.authenticateToken,songsController.updateSongPartially);

module.exports = router;