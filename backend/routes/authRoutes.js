const express = require('express');
const { googleAuth, googleCallback, getUserProfile } = require('../controllers/authController.js');
const { verifyAccessToken } = require('../middleware/verifyAccessToken.js');

const router = express.Router();

router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);
router.get('/user/profile/google', verifyAccessToken, getUserProfile);

module.exports =  router ;