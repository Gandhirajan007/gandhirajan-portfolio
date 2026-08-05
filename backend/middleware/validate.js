const { body, validationResult } = require('express-validator');

/**
 * Validation rules for About Me data
 */
const aboutValidation = [
  body('fullName')
    .optional()
    .isString()
    .withMessage('Full name must be a string')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Full name must be between 1 and 100 characters'),

  body('professionalTitle')
    .optional()
    .isString()
    .withMessage('Professional title must be a string')
    .trim()
    .isLength({ max: 150 })
    .withMessage('Professional title cannot exceed 150 characters'),

  body('bio')
    .optional()
    .isString()
    .withMessage('Bio must be a string')
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Bio cannot exceed 5000 characters'),

  body('profileImageUrl')
    .optional()
    .isString()
    .withMessage('Profile image URL must be a string')
    .trim(),

  body('resumePdfUrl')
    .optional()
    .isString()
    .withMessage('Resume PDF URL must be a string')
    .trim(),

  body('location')
    .optional()
    .isString()
    .withMessage('Location must be a string')
    .trim()
    .isLength({ max: 200 })
    .withMessage('Location cannot exceed 200 characters'),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('phone')
    .optional()
    .isString()
    .withMessage('Phone must be a string')
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone cannot exceed 20 characters'),

  body('education')
    .optional()
    .isArray()
    .withMessage('Education must be an array'),

  body('education.*.degree')
    .optional()
    .isString()
    .trim(),

  body('education.*.institution')
    .optional()
    .isString()
    .trim(),

  body('education.*.year')
    .optional()
    .isString()
    .trim(),

  body('education.*.description')
    .optional()
    .isString()
    .trim(),

  body('experience')
    .optional()
    .isArray()
    .withMessage('Experience must be an array'),

  body('experience.*.title')
    .optional()
    .isString()
    .trim(),

  body('experience.*.company')
    .optional()
    .isString()
    .trim(),

  body('experience.*.duration')
    .optional()
    .isString()
    .trim(),

  body('experience.*.description')
    .optional()
    .isString()
    .trim(),

  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array'),

  body('skills.*.name')
    .optional()
    .isString()
    .trim(),

  body('skills.*.proficiency')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Proficiency must be between 0 and 100'),

  body('skills.*.icon')
    .optional()
    .isString()
    .trim(),

  body('languages')
    .optional()
    .isArray()
    .withMessage('Languages must be an array'),

  body('languages.*.name')
    .optional()
    .isString()
    .trim(),

  body('languages.*.level')
    .optional()
    .isString()
    .trim(),

  body('interests')
    .optional()
    .isArray()
    .withMessage('Interests must be an array'),

  body('interests.*')
    .optional()
    .isString()
    .trim(),

  body('careerObjective')
    .optional()
    .isString()
    .withMessage('Career objective must be a string')
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Career objective cannot exceed 2000 characters'),

  body('socialLinks')
    .optional()
    .isObject()
    .withMessage('Social links must be an object'),

  body('socialLinks.github')
    .optional()
    .isString()
    .trim(),

  body('socialLinks.linkedin')
    .optional()
    .isString()
    .trim(),

  body('socialLinks.instagram')
    .optional()
    .isString()
    .trim(),

  body('socialLinks.x')
    .optional()
    .isString()
    .trim(),
];

/**
 * Validation rules for admin login
 */
const loginValidation = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isString()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isString()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

/**
 * Middleware to check validation results and return errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = {
  aboutValidation,
  loginValidation,
  handleValidationErrors,
};
