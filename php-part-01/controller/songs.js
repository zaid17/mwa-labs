const Song = require("../models/song");
const mongoose = require("mongoose");
module.exports.getSongs = (req, res) => {
  const maxCount = 6;
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
module.exports.addOne = (req, res) => {
  if (!req.body.title || !req.body.publish_year) {
    res.json({ msg: "invalid data, title and publish_year are required." });
    return;
  }
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

module.exports.getOne = (req, res) => {
  const songId = req.params.songId;
  if (!mongoose.isValidObjectId(songId)) {
    res.status(400).json({ error: `${songId} is not a valid object id` });
    return;
  }
  Song.findById(songId).exec(function (err, song) {
    if (err) {
      console.log("error in getOneSong", err);
      res.status(500).json(err);
    }
    res.json(song);
  });
};

module.exports.deleteSongById = (req, res) => {
  const songId = req.params.songId;
  Song.findByIdAndDelete(songId).exec(function (err, deletedSong) {
    const response = {
      status: 204,
      message: `the song with ${songId} was deleted.`,
    };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!deletedSong) {
      console.log("Song id not found");
      response.status = 404;
      response.message = {
        message: "Song ID not found",
      };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.updateSong = (req, res) => {
  if (!req.body.title || !req.body.publish_year) {
    res
      .status(400)
      .json({ msg: "invalid data, title and publish_year are required." });
    return;
  }
  const newSong = {
    title: req.body.title,
    publish_year: req.body.publish_year,
    artists: req.body.artists || [],
  };

  const songId = req.params.songId;
  if (!mongoose.isValidObjectId(songId)) {
    res.json({ msg: "invalid song id" });
    return;
  }
  Song.findOneAndUpdate(songId, newSong, function (err, updatedSong) {
    if (!updatedSong) {
      res.json({ msg: "song id was not found" });
      return;
    } else {
      if (err) {
        console.log("error", err);
        res.status(500).json({ msg: "error while saving" });
        return;
      } else {
        console.log("success");
        res.status(200).json({ msg: `song with id:${songId} was updated.` });
        return;
      }
    }
  });
};

module.exports.updateSongPartially = (req, res) => {
  if (!req.body.title && !req.body.publish_year && !req.body.artists) {
    res.status(400).json({
      msg: "invalid data, title, publish_year or artists are required.",
    });
    return;
  }

  const songId = req.params.songId;
  if (!mongoose.isValidObjectId(songId)) {
    res.status(400).json({ msg: "invalid song id" });
    return;
  }
  Song.findById(songId, function (err, song) {
    if (!song) {
      res.status(404).json({ msg: "song id was not found" });
      return;
    } else if (err) {
      console.log("error", err);
      res.status(500).json({ msg: "error while saving" });
      return;
    }

    song.title = req.body.title || song.title;
    song.publish_year = req.body.publish_year || song.publish_year ;
    song.artists = req.body.artists || song.artists;

    song.save((err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: "error while saving" });
        return;
      } else {
        res.status(200).json({ msg: "song was updated." });
      }
    });
    // } else {
    //   console.log("success");
    //   res.status(200).json({ msg: `song with id:${songId} was updated.` });
    //   return;
    // }
  });
};
