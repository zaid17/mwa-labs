const Game = require("../model/game");
const mongoose = require("mongoose");

module.exports.getGames = (req, res) => {
  console.log("getGames");
  const maxCount = 50;
  const count = req.query.count || maxCount;
  const offset = req.query.offset || 0;
  console.log(count);
  Game.find()
    .limit(count)
    .skip(offset)
    .exec((err, games) => {
      if (err) {
        res.status(500).json({ msg: err });
        return;
      } else {
        console.log("Found Games");
        res.send(games);
        return;
      }
    });
};

module.exports.addGame = (req, res) => {
  const title = req.body.title;
  const year = req.body.year;
  const price = req.body.prce;

  Game.create(req.body, (err, game) => {
    if (err) {
      res.status(500).send(err);
      return;
    } else res.status(201).send("added");
  });
};

module.exports.getGame = (req, res) => {
  const id = req.params.gameId;

  Game.findById(id).exec((err, game) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(game);
  });
};

module.exports.deleteGame = (req, res) => {
  const id = req.params.gameId;

  Game.findByIdAndDelete(id).exec((err, game) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send("deleted");
  });
};
module.exports.searchGamesByTitle = (req, res) => {
  const id = req.params.gameId;

  Game.find({ title: { $regex: req.query.title, $options: "i" } }).exec(
    (err, games) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).send(games);
    }
  );
};

module.exports.searchGamesByLocation = (req, res) => {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const point = { type: "Point", coordinates: [lng, lat] };
  const query = {
    "publisher.location.coordinates": {
      $near: {
        $geometry: point,
        $maxDistance: parseFloat(1000, 10),
        $minDistance: parseFloat(0, 10),
      },
    },
  };
  console.log(lng,lat);
  console.log(query);
  Game.find(query)
    .limit(5)
    .exec(function (err, games) {
      if (err) {
        console.log("Geo error ", err);
        res.status(500).json(err);
      } else {
        console.log("Geo results", games);
        res.status(200).json(games);
      }
    });
};
