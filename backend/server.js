// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import the registerUser and loginUser functions
const { registerUser, loginUser } = require('./controllers/userController');

const app = express();

// Middleware to parse the request body as JSON
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

// Use the imported loginUser function for the /login route
app.post('/login', (req, res) => loginUser(req, res));

// Use the imported registerUser function for the /register route
app.post('/register', (req, res) => registerUser(req, res));

// Set up the server to listen on a specified port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
