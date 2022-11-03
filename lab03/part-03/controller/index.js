const data = require("../data/games.json");

module.exports.getAllGames = (req, res) => {
  res.send(data);
};
