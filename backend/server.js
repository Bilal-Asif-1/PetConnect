require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const routes = require('./routes');

// Import upload route
const uploadRoute = require('./routes/upload');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Serve uploads folder statically
app.use('/uploads', express.static(require('path').join(__dirname, 'uploads')));

// Upload route
app.use('/api/upload', uploadRoute);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to PetConnect API');
});

// MongoDB connection
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
