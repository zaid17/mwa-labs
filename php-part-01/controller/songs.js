const Song = require("../models/song");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const _createDefaultResponseObject = (status, msg) => {
  return {
    status: status | 200,
    msg: msg | "success",
  };
};

const _isValidObjectId = (id) => {
  return mongoose.isValidObjectId(id);
};
const _sendResponse = (res, response) => {
  res.status(parseInt(response.status)).json(response.msg);
};

const _songNotFoundHandler = (res, response) => {
  response.status = process.env.RESOURCE_WAS_NOT_FOUND_STATUS_CODE;
  response.msg = "resource was not found";
  _sendResponse(res, response);
  return;
};

module.exports.getSongs = (req, res) => {
  const maxCount = parseInt(process.env.MAX_SONGS_COUNT);
  const response = _createDefaultResponseObject();
  const offset = req.query.offset || 0;
  const count = req.query.count;

  if ((count && isNaN(count)) || count > maxCount) {
    response.status = process.env.INVALID_PARAMS_STATUS_CODE;
    response.msg = process.env.INVALID_PARAMS_MESSAGE;
    _sendResponse(res, response);
    return;
  }
  Song.find()
    .limit(count)
    .skip(offset)
    .then((songs) => {
      response.status = process.env.OK_STATUS_CODE;
      response.msg = songs;
      _sendResponse(res, response);
    })
    .catch((err) => {
      response.status = process.env.INTERNAL_SERVER_ERORR_STATUS_CODE;
      response.msg = err;
      _sendResponse(res, response);
    });
};

const _validNewSongParams = (req) => {
  if (!req.body.title || !req.body.publish_year) return false;

  return true;
};

const _createNewSongObject = (req) => {
  const song = {
    title: req.body.title,
    publish_year: req.body.publish_year,
    artists: req.body.artists,
  };

  return song;
};

module.exports.addOne = (req, res) => {
  const response = _createDefaultResponseObject();
  if (!_validNewSongParams(req)) {
    response.status = process.env.INVALID_PARAMS_STATUS_CODE;
    response.msg = process.env.INVALID_PARAMS_MESSAGE;

    _sendResponse(res, response);
  }

  // const saltRounds = 10;
  // const myPlaintextPassword = req.body.password;

  // const salt = bcrypt.genSaltSync(saltRounds);
  // const hash = bcrypt.hashSync(myPlaintextPassword, salt);
  // // to check the hash
  // //bcrypt.compareSync(myPlaintextPassword, hash);
  const song = _createNewSongObject(req);
  Song.create(song)
    .then((song) => {
      response.status = process.env.CREATE_STATUS_CODE;
      response.msg = song;
      _sendResponse(response);
    })
    .catch((err) => {
      response.status = process.env.INTERNAL_SERVER_IRORR_STATUS_CODE;
      response.msg = err;
      _sendResponse(res, response);
    });
};

module.exports.getOne = (req, res) => {
  const songId = req.params.songId;
  const response = _createDefaultResponseObject();
  if (!_isValidObjectId(songId)) {
    response.status = process.env.INVALID_PARAMS_STATUS_CODE;
    response.msg = process.env.INVALID_PARAMS_MESSAGE;
    _sendResponse(res, response);
    return;
  }
  Song.findById(songId)
    .then((song) => {
      console.log(song);
      if (!song) {
        response.status = process.env.RESOURCE_WAS_NOT_FOUND_STATUS_CODE;
        response.msg = song;
        _sendResponse(res, response);
        return;
      }
      response.status = process.env.OK_STATUS_CODE;
      response.msg = song;
      _sendResponse(res, response);
    })
    .catch((err) => {
      response.status = process.env.INTERNAL_SERVER_ERORR_STATUS_CODE;
      response.msg = err;
      _sendResponse(res, response);
    });
};

module.exports.deleteSongById = (req, res) => {
  const songId = req.params.songId;
  const response = _createDefaultResponseObject();
  if (!_isValidObjectId(songId)) {
    response.msg = process.env.INVALID_PARAMS_MESSAGE;
    response.status = process.env.INVALID_PARAMS_STATUS_CODE;
    _sendResponse(res, response);
    return;
  }
  Song.findByIdAndDelete(songId)
    .then((song) => {
      if (!song) {
        _songNotFoundHandler(res, response);
        return;
      }
      response.status = process.env.NO_CONTENT_STATUS_CODE;
      response.msg = song;
      _sendResponse(res, response);
    })
    .catch((err) => {
      response.status = process.env.INTERNAL_SERVER_ERORR_STATUS_CODE;
      response.msg = err;
      _sendResponse(res, response);
    });
};

module.exports.updateSong = (req, res) => {
  const reponse = _createDefaultResponseObject();
  if (!_validNewSongParams(req)) {
    reponse.status = process.env.INVALID_PARAMS_STATUS_CODE;
    reponse.msg = process.env.INVALID_PARAMS_MESSAGE;
    _sendResponse(res, response);
  }
  const newSong = {
    title: req.body.title,
    publish_year: req.body.publish_year,
    artists: req.body.artists || [],
  };

  const songId = req.params.songId;
  if (!_isValidObjectId(songId)) {
    reponse.status = process.env.INVALID_PARAMS_STATUS_CODE;
    reponse.msg = process.env.INVALID_PARAMS_MESSAGE;
    _sendResponse(res, response);
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
    song.publish_year = req.body.publish_year || song.publish_year;
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
  });
};
