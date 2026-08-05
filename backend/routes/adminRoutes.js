const express = require('express');
const router = express.Router();
const { login } = require('../controllers/adminController');
const { loginValidation, handleValidationErrors } = require('../middleware/validate');

// POST /api/admin/login — Public: Admin login
router.post('/login', loginValidation, handleValidationErrors, login);

module.exports = router;
