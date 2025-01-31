require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes'); // Import routes

const app = express();
app.use(express.json());
app.use(cors());

// Define API routes
app.use('/users', userRoutes);

module.exports = app; // Export the app
