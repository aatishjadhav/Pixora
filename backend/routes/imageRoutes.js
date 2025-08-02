const express = require('express');
const router = express.Router();
const {getAllFavourites, uploadImage, getImages, getFavorites, toggleFavorite, addComment, deleteImage, getAllImages, uploadImages, getComments, getImageById, editComment, deleteComment } = require("../controllers/imageController");
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
router.get("/:imageId", verifyAccessToken, getImageById);
router.get("/albums/:albumId/favorites", verifyAccessToken, getFavorites);
router.post("/albums/:albumId", verifyAccessToken, upload.single("file"), uploadImage);
router.put("/albums/:albumId/:imageId/favorite", verifyAccessToken, toggleFavorite);
router.post("/:imageId/comments", verifyAccessToken, addComment);
router.get("/:imageId/comments", verifyAccessToken, getComments);
router.put("/:imageId/comments/:commentId", verifyAccessToken, editComment);
router.delete("/:imageId/comments/:commentId", verifyAccessToken, deleteComment);
router.delete("/albums/:albumId/:imageId", verifyAccessToken, deleteImage);

module.exports = router;