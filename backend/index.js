const express = require('express');
const { initializeDatabase } = require("./db/db.connect");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const albumRoutes = require("./routes/albumRoutes");
const imageRoutes = require("./routes/imageRoutes");

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api/albums', albumRoutes);
app.use("/api/images", imageRoutes);


initializeDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});




// multer
// const storage = multer.diskStorage({});
// const upload = multer({ storage });

// api endpoint
// app.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) return res.status(400).send("No file uploaded");

//     // upload to cloudinary
//     const result = await cloudinary.uploader.upload(file.path, {
//       folder: "uploads",
//     });

//     // save to mongoDB
//     const newImage = new ImageModel({ imageUrl: result.secure_url });
//     await newImage.save();

//     res.status(200).json({
//       message: "Image uploaded successfully",
//       imageUrl: result.secure_url,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Image upload failed", error: error });
//   }
// });

// app.get("/images", async (req, res) => {
//   try {
//     const images = await ImageModel.find();
//     res.status(200).json(images);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to fetch images", error: error });
//   }
// });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
