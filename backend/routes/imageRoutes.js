const express = require('express');
const router = express.Router();
const {getAllFavourites, uploadImage, getImages, getFavorites, toggleFavorite, addComment, deleteImage, getAllImages, uploadImages } = require("../controllers/imageController");
const {verifyAccessToken} = require("../middleware/verifyAccessToken");
const multer = require("multer");
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "kaviospix",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
  },
});

const upload = multer({ storage });
// const upload = multer({ dest: "uploads/", limits: { fileSize: 5 * 1024 * 1024 } });
router.get("/", verifyAccessToken, getAllImages);
router.post("/", verifyAccessToken, upload.single("file"), uploadImages);
router.get("/favorites", verifyAccessToken, getAllFavourites);
router.get("/albums/:albumId", verifyAccessToken, getImages);
router.get("/albums/:albumId/favorites", verifyAccessToken, getFavorites);
router.post("/albums/:albumId", verifyAccessToken, upload.single("file"), uploadImage);
router.put("/albums/:albumId/:imageId/favorite", verifyAccessToken, toggleFavorite);
router.post("/albums/:albumId/:imageId/comments", verifyAccessToken, addComment);
router.delete("/albums/:albumId/:imageId", verifyAccessToken, deleteImage);

module.exports = router;