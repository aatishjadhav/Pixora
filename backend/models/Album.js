const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sharedWith: [String],
    coverPhotoUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Album", albumSchema);
