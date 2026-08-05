const path = require('path');
const fs = require('fs');
const multer = require('multer');
const About = require('../models/About');

// --- Multer Configuration ---

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDir;
    if (file.fieldname === 'profile') {
      uploadDir = path.join(__dirname, '..', 'uploads', 'profiles');
    } else if (file.fieldname === 'resume') {
      uploadDir = path.join(__dirname, '..', 'uploads', 'resumes');
    } else {
      return cb(new Error('Unexpected file field'), null);
    }

    // Create directory if it doesn't exist
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const prefix = file.fieldname === 'profile' ? 'profile' : 'resume';
    const filename = `${prefix}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

// File filter — restrict allowed file types
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'profile') {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Profile image must be JPEG, PNG, or WebP'), false);
    }
  } else if (file.fieldname === 'resume') {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Resume must be a PDF file'), false);
    }
  } else {
    cb(new Error('Unexpected file field'), false);
  }
};

// Multer upload instances
const uploadProfile = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB for images
}).single('profile');

const uploadResume = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB for PDFs
}).single('resume');

// --- Helper: Delete old file ---
const deleteOldFile = (filePath) => {
  if (filePath) {
    // Convert URL path to filesystem path
    const fullPath = path.join(__dirname, '..', filePath.replace(/^\//, ''));
    if (fs.existsSync(fullPath)) {
      try {
        fs.unlinkSync(fullPath);
        console.log(`🗑️  Deleted old file: ${fullPath}`);
      } catch (err) {
        console.error(`⚠️  Failed to delete old file: ${err.message}`);
      }
    }
  }
};

// --- Controllers ---

/**
 * @desc    Upload profile image
 * @route   POST /api/upload/profile
 * @access  Admin
 */
const handleProfileUpload = (req, res, next) => {
  uploadProfile(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          success: false,
          message: err.code === 'LIMIT_FILE_SIZE'
            ? 'Profile image must be under 5MB'
            : err.message,
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No profile image file provided. Use field name "profile".',
      });
    }

    try {
      // Build the URL path for the uploaded file
      const fileUrl = `/uploads/profiles/${req.file.filename}`;

      // Find existing About document and get the old image path
      const existingAbout = await About.findOne().lean();
      if (existingAbout && existingAbout.profileImageUrl) {
        deleteOldFile(existingAbout.profileImageUrl);
      }

      // Update or create the About document with new image URL
      const about = await About.findOneAndUpdate(
        {},
        { $set: { profileImageUrl: fileUrl } },
        { new: true, upsert: true, runValidators: true }
      ).lean();

      res.status(200).json({
        success: true,
        message: 'Profile image uploaded successfully',
        data: {
          profileImageUrl: fileUrl,
          filename: req.file.filename,
          size: req.file.size,
        },
      });
    } catch (error) {
      next(error);
    }
  });
};

/**
 * @desc    Upload resume PDF
 * @route   POST /api/upload/resume
 * @access  Admin
 */
const handleResumeUpload = (req, res, next) => {
  uploadResume(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          success: false,
          message: err.code === 'LIMIT_FILE_SIZE'
            ? 'Resume PDF must be under 10MB'
            : err.message,
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No resume file provided. Use field name "resume".',
      });
    }

    try {
      // Build the URL path for the uploaded file
      const fileUrl = `/uploads/resumes/${req.file.filename}`;

      // Find existing About document and get the old resume path
      const existingAbout = await About.findOne().lean();
      if (existingAbout && existingAbout.resumePdfUrl) {
        deleteOldFile(existingAbout.resumePdfUrl);
      }

      // Update or create the About document with new resume URL
      const about = await About.findOneAndUpdate(
        {},
        { $set: { resumePdfUrl: fileUrl } },
        { new: true, upsert: true, runValidators: true }
      ).lean();

      res.status(200).json({
        success: true,
        message: 'Resume uploaded successfully',
        data: {
          resumePdfUrl: fileUrl,
          filename: req.file.filename,
          size: req.file.size,
        },
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = { handleProfileUpload, handleResumeUpload };
