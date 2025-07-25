const express = require('express');
const router = express.Router();
const { getAlbumById, createAlbum, updateAlbum, shareAlbum, deleteAlbum, getUserAlbums } = require("../controllers/albumController");
const {verifyAccessToken} = require("../middleware/verifyAccessToken");
const multer = require("multer");
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "kaviospix/albums",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
  },
});

const upload = multer({ storage });

router.get("/", verifyAccessToken, getUserAlbums);
router.post("/", verifyAccessToken, upload.single("cover"), createAlbum);
router.get("/:albumId", verifyAccessToken, getAlbumById);
router.put("/:albumId", verifyAccessToken, updateAlbum);
router.post("/:albumId/share", verifyAccessToken, shareAlbum);
router.delete("/:albumId", verifyAccessToken, deleteAlbum);


module.exports = router;