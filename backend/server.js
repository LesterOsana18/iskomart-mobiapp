// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import the registerUser and loginUser functions
const { registerUser, loginUser } = require('./controllers/userController');

// Import item-related functions
const { getItems, getUserItems, addItem, likeItemController, unlikeItemController } = require('./controllers/itemController');

const app = express();

// Middleware to parse the request body as JSON
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

// Login and register routes
app.post('/login', (req, res) => loginUser(req, res));
app.post('/register', (req, res) => registerUser(req, res));

// Item routes
app.get('/items', (req, res) => getItems(req, res)); // Get all items
app.get('/items/:user_id', (req, res) => getUserItems(req, res)); // Get user's items
app.post('/items/:item_id/like', (req, res) => likeItemController(req, res)); // Like an item
app.post('/items/:item_id/unlike', (req, res) => unlikeItemController(req, res)); // Unlike an item

// Set up the server to listen on a specified port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
