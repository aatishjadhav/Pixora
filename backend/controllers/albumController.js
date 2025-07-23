const Album = require("../models/Album.js");
const User = require("../models/User.js");

const getAlbumById = async (req, res) => {
  const album = await Album.findById(req.params.albumId);
  if (!album) return res.status(404).json({ error: "Album not found" });

  // Optional: restrict access to owner or sharedWith
  if (
    album.ownerId.toString() !== req.user.userId &&
    !album.sharedWith.includes(req.user.email)
  ) {
    return res.status(403).json({ error: "Access denied" });
  }

  res.json(album);
};


const createAlbum = async (req, res) => {
  const { name, description } = req.body;
  const coverPhotoUrl = req.file?.path || null; // from Cloudinary

  const album = await Album.create({
    name,
    description,
    ownerId: req.user.userId,
     coverPhotoUrl,
  });
  res.status(201).json(album);
};

const updateAlbum = async (req, res) => {
  const album = await Album.findById(req.params.albumId);
  if (!album || album.ownerId.toString() !== req.user.userId)
    return res.status(403).json({ error: "Forbidden" });

  album.name = req.body.name || album.name;
  album.description = req.body.description || album.description;
  await album.save();
  res.json(album);
};

const shareAlbum = async (req, res) => {
  const { emails } = req.body;
  const album = await Album.findById(req.params.albumId);
  if (!album || album.ownerId.toString() !== req.user.userId)
    return res.status(403).json({ error: "Forbidden" });

  const validUsers = await User.find({ email: { $in: emails } });
  album.sharedWith.push(...validUsers.map((u) => u.email));
  await album.save();
  res.json(album);
};

const deleteAlbum = async (req, res) => {
  const album = await Album.findById(req.params.albumId);
  if (!album || album.ownerId.toString() !== req.user.userId)
    return res.status(403).json({ error: "Forbidden" });

  await album.deleteOne();
  res.json({ message: "Album deleted" });
};

const getUserAlbums = async (req, res) => {
  const albums = await Album.find({
    $or: [{ ownerId: req.user.userId }, { sharedWith: req.user.email }],
  });
  res.json(albums);
};

module.exports = {
  getAlbumById,
  createAlbum,
  updateAlbum,
  shareAlbum,
  deleteAlbum,
  getUserAlbums,
};
