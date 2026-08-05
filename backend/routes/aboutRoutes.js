const express = require('express');
const router = express.Router();
const { getAbout, updateAbout, deleteAbout } = require('../controllers/aboutController');
const auth = require('../middleware/auth');
const { aboutValidation, handleValidationErrors } = require('../middleware/validate');

// GET /api/about — Public: Fetch About Me data
router.get('/', getAbout);

// PUT /api/about — Admin: Update (or create) About Me data
router.put('/', auth, aboutValidation, handleValidationErrors, updateAbout);

// DELETE /api/about — Admin: Delete About Me data
router.delete('/', auth, deleteAbout);

module.exports = router;
