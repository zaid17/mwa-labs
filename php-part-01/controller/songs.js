const Song = require("../models/song");
const mongoose = require("mongoose");

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
  response.msg =  process.env.RESOURCE_WAS_NOT_FOUND_MESSAGE;
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


module.exports.addOne = (req, res) => {
  const response = _createDefaultResponseObject();
  if (!_validNewSongParams(req)) {
    response.status = process.env.INVALID_PARAMS_STATUS_CODE;
    response.msg = process.env.INVALID_PARAMS_MESSAGE;

    _sendResponse(res, response);
    return;
  }
  const song = _createNewSongObject(req);
  Song.create(song)
    .then((song) => {
      response.status = process.env.CREATE_STATUS_CODE;
      response.msg = song;
      _sendResponse(res, response);
    })
    .catch((err) => {
      response.status = process.env.NTERNAL_SERVER_ERORR_STATUS_CODE;
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
  const response = _createDefaultResponseObject();
  if (!_validUpdateSongParams(req)) {
    response.status = process.env.INVALID_PARAMS_STATUS_CODE;
    response.msg = process.env.INVALID_PARAMS_MESSAGE;
    _sendResponse(res, response);
    return;
  }
  const newSong = {
    artists: req.body.artists || [],
  };

  if (req.body.title) newSong.title = req.body.title;
  if (req.body.publish_year) newSong.publish_year = req.body.publish_year;

  const songId = req.params.songId;
  if (!_isValidObjectId(songId)) {
    response.status = process.env.INVALID_PARAMS_STATUS_CODE;
    response.msg = process.env.INVALID_PARAMS_MESSAGE;
    _sendResponse(res, response);
    return;
  }
  Song.findOneAndUpdate(songId, newSong)
    .then((updatedSong) => {
      _checkUpdatedSong(updatedSong);
    })
    .catch((err) => {
      _updatedSongErrorHandler(err, response);
    })
    .finally(() => {
      _sendResponse(res, response);
    });
};


module.exports.updateSongPartially = (req, res) => {
  const response = _createDefaultResponseObject();
  if (!_validpdateSongPartiallyParams(req)) {
    response.status = process.env.INVALID_PARAMS_STATUS_CODE;
    response.msg = process.env.INVALID_PARAMS_MESSAGE;
    _sendResponse(res, response);
    return;
  }

  const songId = req.params.songId;

  if (!_isValidObjectId(songId)) {
    response.status = process.env.INVALID_PARAMS_STATUS_CODE;
    response.msg = process.env.INVALID_PARAMS_MESSAGE;
    _sendResponse(res, response);
    return;
  }
  Song.findById(songId)
    .then((song) => {
      _checkUpdatedSong(song, response);
      return song;
    })
    .then((song) => _updateSongValues(song, req))
    .then((song) => _saveSong(song))
    .catch((err) => {
      _updatedSongErrorHandler(err, response);
    })
    .finally(() => {
      _sendResponse(res, response);
    });
};

const _updateSongValues = (song, req) => {
  song.title = req.body.title || song.title;
  song.publish_year = req.body.publish_year || song.publish_year;
  song.artists = req.body.artists || song.artists;
  return song;
};

const _saveSong = (song) => {
  song.save((err, result) => {
    if (err) {
      throw process.env.INTERNAL_SERVER_ERORR_MESSAGE;
    } else {
      return;
    }
  });
};

const _updatedSongErrorHandler = (err, response) => {
  response.status = process.env.INTERNAL_SERVER_ERORR_STATUS_CODE;
  response.msg = err;
  return;
};
const _checkUpdatedSong = (updatedSong, response) => {
  if (!updatedSong) {
    response.status = process.env.RESOURCE_WAS_NOT_FOUND_STATUS_CODE;
    response.msg = process.env.RESOURCE_WAS_NOT_FOUND_MESSAGE;
    return;
  }
  response.status = process.env.NO_CONTENT_STATUS_CODE;
  response.msg = process.env.UPDATED_MESSAGE;
  return;
};

const _validpdateSongPartiallyParams = (req) => {
  if (!req.body.title && !req.body.publish_year && !req.body.artists)
    return false;

  return true;
};
const _validNewSongParams = (req) => {
  if (!req.body.title || !req.body.publish_year) return false;

  return true;
};
const _validUpdateSongParams = (req) => {
  if (!req.body.title && !req.body.publish_year) return false;

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
