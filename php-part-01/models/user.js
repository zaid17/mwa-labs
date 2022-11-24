const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model(
  process.env.USER_MODEL,
  userSchema,
  process.env.USERS_COLLECTION
);
