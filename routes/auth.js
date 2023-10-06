const authController = require('../controllers/auth')
const express = require('express');
const multer = require('multer');

const router = express.Router();
//Multer for handling file uploads

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // This Specify the directory where uploaded files should be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now().toISOString() + "-" + file.originalname);
    },
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit the file size to 5MB
  });
  
  const validateAvatar = [
    upload.single("avatar"),
  ];
router.post('/signup',   validateAvatar, authController.registerUser);
router.post('/login', authController.login);

module.exports = router;