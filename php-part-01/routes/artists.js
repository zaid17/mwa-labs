const express = require("express");
const router = express.Router({ mergeParams: true });
const artistsController = require("../controller/artists");
console.log('ok');
router
  .route("/")
  .get(artistsController.getArtists)
  .post(artistsController.addOne);
router
  .route("/:artistId")
  .get(artistsController.getOne)
  .delete(artistsController.deleteOne)
  .put(artistsController.updateArtist)
  .patch(artistsController.updateArtistPartially);

module.exports = router;
