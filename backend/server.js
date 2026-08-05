const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const path = require('path');
const fs = require('fs');

// Load environment variables
require('dotenv').config();

// Database connection
const connectDB = require('./config/db');

// Route modules
const aboutRoutes = require('./routes/aboutRoutes');
const adminRoutes = require('./routes/adminRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Error handler
const errorHandler = require('./middleware/errorHandler');

// Initialize Express app
const app = express();

// --- Security Middleware ---
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow serving uploaded files cross-origin
}));

// CORS — allow frontend on port 8000 and common dev ports
app.use(cors({
  origin: [
    'http://localhost:8000',
    'http://localhost:3000',
    'http://127.0.0.1:8000',
    'http://127.0.0.1:3000',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// NoSQL injection prevention
app.use(mongoSanitize());

// XSS attack prevention
app.use(xssClean());

// --- Body Parsing ---
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// --- Static Files (Uploaded files) ---
// Ensure upload directories exist
const uploadsDir = path.join(__dirname, 'uploads');
const profilesDir = path.join(uploadsDir, 'profiles');
const resumesDir = path.join(uploadsDir, 'resumes');
fs.mkdirSync(profilesDir, { recursive: true });
fs.mkdirSync(resumesDir, { recursive: true });

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// --- API Routes ---
app.use('/api/about', aboutRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// --- Health Check ---
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString(),
  });
});

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// --- Global Error Handler ---
app.use(errorHandler);

// --- Start Server ---
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`\n🚀 Portfolio API Server running on port ${PORT}`);
      console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
      console.log(`🔑 Admin Login:  POST http://localhost:${PORT}/api/admin/login`);
      console.log(`📄 About Data:   GET  http://localhost:${PORT}/api/about`);
      console.log(`❤️  Health Check: GET  http://localhost:${PORT}/api/health`);
      console.log(`\nEnvironment: ${process.env.NODE_ENV || 'development'}\n`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
