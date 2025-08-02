const axios = require("axios");
const qs = require("qs");
const User = require("../models/User.js");
const { generateToken } = require("../utils/jwtUtils.js");
require("dotenv").config();

const googleAuth = (req, res) => {
  const redirectUri = `https://pixora-backend.vercel.app/auth/google/callback`;
  const googleAuthUrl =
    `https://accounts.google.com/o/oauth2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}` +
    `&response_type=code&scope=profile email&access_type=offline&prompt=consent`;
  res.redirect(googleAuthUrl);
};

const googleCallback = async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send("No code provided");

  try {
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      qs.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: `https://pixora-backend.vercel.app/auth/google/callback`,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token } = tokenRes.data;
    const userInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const { email, name, picture } = userInfo.data;
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { name, picture } },
      { upsert: true, new: true }
    );

    const jwtToken = generateToken({ userId: user._id, email });
    res.cookie("access_token", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 2 * 60 * 60 * 1000,
    });
    res.redirect(`${process.env.FRONTEND_URL}/v2/profile/google`);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: "OAuth error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { googleAuth, googleCallback, getUserProfile };
