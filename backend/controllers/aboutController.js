const About = require('../models/About');
const { sanitizeInput } = require('../utils/sanitize');

/**
 * @desc    Get About Me data (public)
 * @route   GET /api/about
 * @access  Public
 */
const getAbout = async (req, res, next) => {
  try {
    const about = await About.findOne().lean();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About Me data not found. Please create one first.',
      });
    }

    res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update About Me data (upsert — creates if not exists)
 * @route   PUT /api/about
 * @access  Admin
 */
const updateAbout = async (req, res, next) => {
  try {
    // Sanitize all input data to prevent XSS
    const sanitizedData = sanitizeInput(req.body);

    // Remove fields that shouldn't be set via this endpoint
    delete sanitizedData._id;
    delete sanitizedData.__v;
    delete sanitizedData.createdAt;
    delete sanitizedData.updatedAt;

    const about = await About.findOneAndUpdate(
      {},                          // Match the single document
      { $set: sanitizedData },     // Update with sanitized data
      {
        new: true,                 // Return updated document
        upsert: true,              // Create if doesn't exist
        runValidators: true,       // Run Mongoose validators
        setDefaultsOnInsert: true, // Apply defaults on insert
      }
    ).lean();

    res.status(200).json({
      success: true,
      message: 'About Me data updated successfully',
      data: about,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete About Me data
 * @route   DELETE /api/about
 * @access  Admin
 */
const deleteAbout = async (req, res, next) => {
  try {
    const about = await About.findOneAndDelete();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About Me data not found. Nothing to delete.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'About Me data deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAbout, updateAbout, deleteAbout };
