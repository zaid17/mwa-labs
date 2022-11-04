module.exports.games = (req, res) => {
  const dbConnection = require("../db").get();

  let limit = parseInt(req.query.limit) || 7;
  console.log(limit);
  if (limit > 7 || limit < 0) limit = 7;

  dbConnection
    .collection("games")
    .find({})
    .limit(limit)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
};

module.exports.addGame = (req, res) => {
  if (!req.body.title || !req.body.price || !req.body.minimumNoOfPlayers) {
    res.end("invalid data");
    return;
  }

  const title = req.body.title;
  const price = req.body.price;
  const minimumNoOfPlayers = parseInt(req.body.minimumNoOfPlayers);

  if (minimumNoOfPlayers < 1 || minimumNoOfPlayers > 11) {
    res.end("invalid data");
    return;
  }

  const dbConnection = require("../db").get();
  dbConnection.collection("games").insertOne({
    title: title,
    price: price,
    minimumNoOfPlayers: minimumNoOfPlayers,
  });
  res.send("saved");
};

module.exports.deleteGame = (req, res) => {
  const dbConnection = require("../db").get();
  console.log(
    dbConnection
      .collection("games")
      .deleteOne({ _id: req.body.id }, function (err, obj) {
        if (err) throw err;

        res.json(obj);
      })
  );
};
