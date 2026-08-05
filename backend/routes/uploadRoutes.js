const express = require('express');
const router = express.Router();
const { handleProfileUpload, handleResumeUpload } = require('../controllers/uploadController');
const auth = require('../middleware/auth');

// POST /api/upload/profile — Admin: Upload profile image
router.post('/profile', auth, handleProfileUpload);

// POST /api/upload/resume — Admin: Upload resume PDF
router.post('/resume', auth, handleResumeUpload);

module.exports = router;
