const mongoose = require("mongoose");
//index the db
//db.games.createIndex({"publisher.location.coordinates
//": "2dsphere"})
const publisherSchema = mongoose.Schema({
  name: String,
  location: { coordinates: [Number] },
  country: String,
});

const gameSchema = mongoose.Schema({
  title: { type: String, required: true },
  year: { required: true, type: Number },
  price: { required: true, type: Number },
  minPlayers: { type: Number, required: true },
  maxPlayers: { type: Number, required: true },
  publisher: publisherSchema,
});

module.exports = mongoose.model("Game", gameSchema, "games");
