const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: String,
  albumId: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
  cloudUrl: String,
  tags: [String],
  person: String,
  isFavorite: Boolean,
  size: Number,
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Image", imageSchema);
