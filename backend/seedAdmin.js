/**
 * Admin Seeder Script
 * Creates the initial admin user from environment variables.
 * Run: node seedAdmin.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'Admin@123';

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: username.toLowerCase() });

    if (existingAdmin) {
      console.log(`⚠️  Admin user "${username}" already exists. Skipping seed.`);
    } else {
      // Create admin user (password is auto-hashed by the pre-save hook)
      const admin = await Admin.create({
        username,
        password,
      });

      console.log(`✅ Admin user created successfully!`);
      console.log(`   Username: ${admin.username}`);
      console.log(`   Password: ${password}`);
    }

    // Disconnect and exit
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seed error: ${error.message}`);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedAdmin();
