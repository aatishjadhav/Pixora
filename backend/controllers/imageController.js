const Image = require("../models/Image.js");
const Album = require("../models/Album.js");
const fs = require("fs");
const path = require("path");
const Comment = require("../models/Comment.js");

const uploadImage = async (req, res) => {
  const { tags, person, isFavorite } = req.body;
  const { albumId } = req.params;

  const album = await Album.findById(albumId);
  if (
    !album ||
    (album.ownerId.toString() !== req.user.userId &&
      !album.sharedWith.includes(req.user.email))
  )
    return res.status(403).json({ error: "Forbidden" });

  const image = await Image.create({
    name: req.file.originalname,
    albumId,
    cloudUrl: req.file.path,
    tags: tags ? tags.split(",") : [],
    person,
    isFavorite: isFavorite === "true",
    size: req.file.size,
  });

  res.status(201).json(image);
};

const uploadImages = async (req, res) => {
   try {
      const { tags, person, isFavorite } = req.body;

      const image = await Image.create({
        name: req.file.originalname,
        albumId: null, // No album
        cloudUrl: req.file.path,
        tags: tags ? tags.split(",") : [],
        person,
        isFavorite: isFavorite === "true",
        size: req.file.size,
      });

      res.status(201).json(image);
    } catch (err) {
      console.error("Image upload failed:", err);
      res.status(500).json({ error: "Upload failed" });
    }
  }


const getFavorites = async (req, res) => {
  const favorites = await Image.find({
    albumId: req.params.albumId,
    isFavorite: true,
  });
  res.json(favorites);
};

const getAllFavourites = async (req, res) => {
  try {
    const favorites = await Image.find({
      isFavorite: true,
    })
      .populate("albumId", "name createdAt")
      .sort({ uploadedAt: -1 });

    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch global favorites" });
  }
};

const getImages = async (req, res) => {
  const tags = req.query.tags?.split(",");
  const query = { albumId: req.params.albumId };
  if (tags) query.tags = { $in: tags };

  const images = await Image.find(query);
  res.json(images);
};

const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.imageId);
    if (!image) return res.status(404).json({ error: "Image not found" });
    res.json(image);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch image" });
  }
};


const getAllImages = async (req, res) => {
   try {
    const userEmail = req.user.email;

    const albums = await Album.find({
      $or: [{ ownerId: req.user.userId }, { sharedWith: userEmail }],
    });

    const albumIds = albums.map((a) => a._id);

    const images = await Image.find({
      $or: [{ albumId: { $in: albumIds } }, { albumId: null }],
    });

    res.json(images);
  } catch (err) {
    console.error("Error loading all images:", err);
    res.status(500).json({ error: "Failed to load images" });
  }
};



const toggleFavorite = async (req, res) => {
  const image = await Image.findById(req.params.imageId);
  if (!image) return res.status(404).json({ error: "Not found" });

  image.isFavorite = req.body.isFavorite;
  await image.save();
  res.json(image);
};



const deleteImage = async (req, res) => {
  await Image.findByIdAndDelete(req.params.imageId);
  res.json({ message: "Image deleted" });
};

const addComment = async (req, res) => {
  try {
    const { imageId } = req.params;
    const { text } = req.body;

    const comment = await Comment.create({
      imageId,
      userId: req.user.userId,
      text,
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error("Failed to add comment:", err);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

const getComments = async (req, res) => {
  try {
    const { imageId } = req.params;

    const comments = await Comment.find({ imageId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.error("Failed to load comments:", err);
    res.status(500).json({ error: "Failed to load comments" });
  }
};

const editComment =  async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  const comment = await Comment.findById(commentId);
  if (!comment) return res.status(404).json({ error: "Comment not found" });

  // Check ownership
  if (comment.userId.toString() !== req.user.userId)
    return res.status(403).json({ error: "Forbidden" });

  comment.text = text;
  await comment.save();
  res.json(comment);
};

const deleteComment =  async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) return res.status(404).json({ error: "Comment not found" });

  if (comment.userId.toString() !== req.user.userId)
    return res.status(403).json({ error: "Forbidden" });

  await Comment.findByIdAndDelete(commentId);
  res.json({ message: "Comment deleted" });
};



module.exports = {
  getAllFavourites,
  uploadImage,
  getImages,
  getImageById,
  uploadImages,
  getAllImages,
  getFavorites,
  toggleFavorite,
  addComment,
  getComments,
  deleteImage,
  editComment,
  deleteComment
};
