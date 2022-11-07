const express = require("express");
const songsController = require("../controller/songs");
const artistsController = require("../controller/artists");
const router = express.Router();

router.route("/").post(songsController.addOne).get(songsController.getSongs);
router
  .route("/:songId")
  .get(songsController.getOne)
  .delete(songsController.deleteSongById)
  .put(songsController.updateSong)
  .patch(songsController.updateSongPartially);
//

router
  .route("/:songId/artists")
  .get(artistsController.getArtists)
  .post(artistsController.addOne);
router
  .route("/:songId/artists/:artistId")
  .get(artistsController.getOne)
  .delete(artistsController.deleteOne)
  .put(artistsController.updateArtist)
  .patch(artistsController.updateArtistPartially);

module.exports = router;
