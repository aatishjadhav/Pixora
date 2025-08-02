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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
