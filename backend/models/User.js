const mongoose = require("mongoose");

const KaviosUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  picture: String,
});

module.exports = mongoose.model('KaviosUser', KaviosUserSchema);
