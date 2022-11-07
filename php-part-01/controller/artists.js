const Song = require("../models/song");
const mongoose = require("mongoose");

module.exports.addOne = (req, res) => {
  if (!req.body.start_year || !req.body.name) {
    res
      .status(400)
      .json({ msg: "invalid data, name and start_year are required." });
    return;
  }
  const newArtist = {
    name: req.body.name,
    start_year: req.body.start_year,
  };

  const songId = req.params.songId;

  if (!mongoose.isValidObjectId(songId)) {
    res.json({ msg: "invalid song id" });
    return;
  }
  Song.findById(songId)
    .select("artists")
    .exec(function (err, song) {
      if (!song) {
        res.status(404).json({ msg: "song id was not found" });
        return;
      } else if (err) {
        console.log("error", err);
        res.status(500).json({ msg: "error while saving" });
        return;
      }
      song.artists.push(newArtist);

      song.save((err, result) => {
        if (err) {
          res.status(500).json({ msg: "error while saving" + err });
          return;
        } else {
          console.log("success");
          res.status(200).json({ msg: `song with id:${songId} was updated.` });
          return;
        }
      });
    });
};

module.exports.getArtists = (req, res) => {
  console.log(req.params);
  const songId = req.params.songId;
  console.log(songId);
  if (!mongoose.isValidObjectId(songId)) {
    res.status(400).json({ error: `${songId} is not a valid object id` });
    return;
  }
  Song.findById(songId)
    .select("artists")
    .exec(function (err, artists) {
      if (err) {
        console.log("error in getArtists", err);
        res.status(500).json(err);
        return;
      }
      if (!artists) {
        res.status(404).json({ msg: "song was not found" });
        return;
      }
      res.json(artists);
      return;
    });
};

module.exports.getOne = (req, res) => {
  const songId = req.params.songId;
  const artistId = req.params.artistId;

  if (
    !mongoose.isValidObjectId(songId) ||
    !mongoose.isValidObjectId(artistId)
  ) {
    res.status(400).send("invalid object id");
    return;
  }
  Song.findById(songId)
    .select("artists")
    .exec(function (err, song) {
      if (err) {
        res.status(500).json(err);
        return;
      }
      if (!song) {
        res.status(404).send();
        return;
      }
      const artist = song.artists.id(artistId);
      if (!artist) {
        res.status(404).json({ msg: "artist was not found" });
        return;
      }
      res.status(200).json(artist);
    });
};

module.exports.deleteOne = (req, res) => {
  const songId = req.params.songId;
  const artistId = req.params.artistId;

  if (
    !mongoose.isValidObjectId(songId) ||
    !mongoose.isValidObjectId(artistId)
  ) {
    res.status(400).send("invalid object id");
    return;
  }
  Song.findById(songId)
    .select("artists")
    .exec(function (err, song) {
      if (err) {
        res.status(500).json(err);
        return;
      }
      if (!song) {
        res.status(404).send();
        return;
      }
      const artist = song.artists.id(artistId);
      if (!artist) {
        res.status(404).json({ msg: "artist was not found" });
        return;
      }
      artist.remove();
      song.save();
      res.status(200).json({ msg: "artist was deleted" });
    });
};

module.exports.updateArtist = (req, res) => {
  if (!req.body.start_year || !req.body.name) {
    res
      .status(400)
      .json({ msg: "invalid data, name and start_year are required." });
    return;
  }
  const newArtist = {
    name: req.body.name,
    start_year: req.body.start_year,
  };

  const songId = req.params.songId;
  const artistId = req.params.artistId;
  if (
    !mongoose.isValidObjectId(songId) ||
    !mongoose.isValidObjectId(artistId)
  ) {
    res.json({ msg: "invalid song id" });
    return;
  }
  console.log("before update");
  Song.findById(songId)
    .select("artists")
    .exec(function (err, song) {
      if (!song) {
        res.status(404).json({ msg: "song id was not found" });
        return;
      } else if (err) {
        console.log("error", err);
        res.status(500).json({ msg: "error while saving" });
        return;
      }
      console.log("befoer find");
      const artist = song.artists.id(artistId);
      console.log("artist", artist);
      if (!artist) {
        res.status(404).json({ msg: "artist id was not found" });
        return;
      }
      console.log(newArtist);
      artist.name = newArtist.name;
      artist.start_year = newArtist.start_year;
      song.save((err, result) => {
        if (err) {
          res.status(500).json({ msg: "error while saving" + err });
          return;
        } else {
          console.log("success");
          res.status(200).json({ msg: `song with id:${songId} was updated.` });
          return;
        }
      });
    });
};

module.exports.updateArtistPartially = (req, res) => {
  if (!req.body.start_year && !req.body.name) {
    res
      .status(400)
      .json({ msg: "invalid data, name or start_year is required." });
    return;
  }

  const songId = req.params.songId;
  const artistId = req.params.artistId;
  if (
    !mongoose.isValidObjectId(songId) ||
    !mongoose.isValidObjectId(artistId)
  ) {
    res.json({ msg: "invalid song id" });
    return;
  }
  console.log("before update");
  Song.findById(songId)
    .select("artists")
    .exec(function (err, song) {
      if (!song) {
        res.status(404).json({ msg: "song id was not found" });
        return;
      } else if (err) {
        console.log("error", err);
        res.status(500).json({ msg: "error while saving" });
        return;
      }
      const artist = song.artists.id(artistId);
      if (!artist) {
        res.status(404).json({ msg: "artist id was not found" });
        return;
      }
      artist.name = req.body.name || artist.name;
      artist.start_year = req.body.start_year || artist.start_year;
      song.save((err, result) => {
        if (err) {
          res.status(500).json({ msg: "error while saving" + err });
          return;
        } else {
          console.log("success");
          res.status(200).json({ msg: `song with id:${songId} was updated.` });
          return;
        }
      });
    });
};
