const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Full name cannot exceed 100 characters'],
    },
    professionalTitle: {
      type: String,
      required: [true, 'Professional title is required'],
      trim: true,
      maxlength: [150, 'Professional title cannot exceed 150 characters'],
    },
    bio: {
      type: String,
      required: [true, 'Bio is required'],
      trim: true,
      maxlength: [5000, 'Bio cannot exceed 5000 characters'],
    },
    profileImageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    resumePdfUrl: {
      type: String,
      trim: true,
      default: '',
    },
    location: {
      type: String,
      trim: true,
      maxlength: [200, 'Location cannot exceed 200 characters'],
      default: '',
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
      default: '',
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20, 'Phone number cannot exceed 20 characters'],
      default: '',
    },
    education: [
      {
        degree: { type: String, trim: true, default: '' },
        institution: { type: String, trim: true, default: '' },
        year: { type: String, trim: true, default: '' },
        description: { type: String, trim: true, default: '' },
      },
    ],
    experience: [
      {
        title: { type: String, trim: true, default: '' },
        company: { type: String, trim: true, default: '' },
        duration: { type: String, trim: true, default: '' },
        description: { type: String, trim: true, default: '' },
      },
    ],
    skills: [
      {
        name: { type: String, trim: true, default: '' },
        proficiency: {
          type: Number,
          min: [0, 'Proficiency must be at least 0'],
          max: [100, 'Proficiency cannot exceed 100'],
          default: 0,
        },
        icon: { type: String, trim: true, default: '' },
      },
    ],
    languages: [
      {
        name: { type: String, trim: true, default: '' },
        level: { type: String, trim: true, default: '' },
      },
    ],
    interests: [
      {
        type: String,
        trim: true,
      },
    ],
    careerObjective: {
      type: String,
      trim: true,
      maxlength: [2000, 'Career objective cannot exceed 2000 characters'],
      default: '',
    },
    socialLinks: {
      github: { type: String, trim: true, default: '' },
      linkedin: { type: String, trim: true, default: '' },
      instagram: { type: String, trim: true, default: '' },
      x: { type: String, trim: true, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only one About document exists (singleton pattern)
aboutSchema.statics.getSingleton = async function () {
  const doc = await this.findOne().lean();
  return doc;
};

module.exports = mongoose.model('About', aboutSchema);
