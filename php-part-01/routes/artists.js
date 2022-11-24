const express = require("express");
const router = express.Router({ mergeParams: true });
const artistsController = require("../controller/artists");
const authController = require("../controller/auth");
console.log('ok');
router
  .route("/")
  .get(artistsController.getArtists)
  .post(authController.authenticateToken,artistsController.addOne);
router
  .route("/:artistId")
  .get(artistsController.getOne)
  .delete(authController.authenticateToken,artistsController.deleteOne)
  .put(authController.authenticateToken,artistsController.updateArtist)
  .patch(authController.authenticateToken,artistsController.updateArtistPartially);

module.exports = router;
