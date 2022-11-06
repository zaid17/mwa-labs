const mongoose = require("mongoose");

//songs(title,year,artists(sub doc (name,year started singing)))
//(songs with more than one signer)

const artistSchema = mongoose.Schema({
  name: { type: String, required: true },
  start_year: { type: String, required: true },
});
const songSchema = mongoose.Schema({
  title: { type: String, required: true },
  publish_year: { type: String, required: true },
  artists: [artistSchema],
});

module.exports = mongoose.model(
  process.env.SONG_MODEL,
  songSchema,
  process.env.SONGS_COLLECTION
);
