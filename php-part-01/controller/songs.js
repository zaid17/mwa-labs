const Song = require("../models/song");
const mongoose = require("mongoose");
module.exports.getSongs = (req, res) => {
  const maxCount = 3;
  if (
    !req.query.count ||
    isNaN(req.query.count) ||
    req.query.count > maxCount
  ) {
    res.status(400).json({
      error: `invalid count, count should be a valid digit and less than or equeal to ${maxCount}`,
    });
    return;
  }
  const count = req.query.count;
  Song.find()
    .limit(count)
    .exec(function (err, songs) {
      if (err) {
        console.log("error in getSongs", err);
        res.status(500).json(err);
        return;
      } else {
        console.log("Found songs", songs.length);
        res.send(songs);
      }
    });
};
module.exports.addSong = (req, res) => {
  console.log(req.body.title);
  const song = {
    title: req.body.title,
    publish_year: req.body.publish_year,
    artists: req.body.artists,
  };
  Song.create(song, (err, song) => {
    const response = { status: 201, message: song };
    if (err) {
      console.log("Error creating song", err);
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.getOneSong = (req, res) => {
  const songId = req.params.songId;
  if (!mongoose.isValidObjectId(songId)) {
    res.status(400).json({ error: `${songId} is not a valid object id` });
  }
  Song.findById(songId).exec(function (err, song) {
    if (err) {
      console.log("error in getOneSong", err);
      res.status(500).json(err);
    }
    res.json(song);
  });
};

module.exports.deleteSong = (req, res) => {};
