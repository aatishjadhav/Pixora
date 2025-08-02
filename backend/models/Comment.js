const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: "Image", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "KaviosUser", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
