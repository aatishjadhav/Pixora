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
router.get("/images/favorites", verifyAccessToken, getAllFavourites);
router.post("/:albumId/images", verifyAccessToken, upload.single("file"), uploadImage);
router.post("/images/upload", verifyAccessToken, upload.single("file"), uploadImages);
router.get("/images/all", verifyAccessToken, getAllImages);
router.get("/:albumId/images", verifyAccessToken, getImages);
router.get("/:albumId/images/favorites", verifyAccessToken, getFavorites);

router.put("/:albumId/images/:imageId/favorite", verifyAccessToken, toggleFavorite);
router.post("/:albumId/images/:imageId/comments", verifyAccessToken, addComment);
router.delete("/:albumId/images/:imageId", verifyAccessToken, deleteImage);

module.exports = router;