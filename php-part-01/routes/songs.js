const express = require("express");
const songsController = require("../controller/songs");
const router = express.Router();

router.route("/").post(songsController.addOne).get(songsController.getSongs);
router
  .route("/:songId")
  .get(songsController.getOne)
  .delete(songsController.deleteSongById)
  .put(songsController.updateSong)
  .patch(songsController.updateSongPartially);

module.exports = router;