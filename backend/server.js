const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
require('dotenv').config();

// Create an Express app
const app = express();

// Middleware to parse the request body as JSON
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

// Create a connection to the MySQL database
db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// POST route to handle login requests
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.execute(query, [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length > 0) {
      // Compare the password with the stored hashed password
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (err) return res.status(500).json({ message: 'Error comparing passwords', error: err });
        if (isMatch) {
          return res.status(200).json({
            message: 'Login successful',
            userData: results[0], // Return the first user data if needed
          });
        } else {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
      });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// Use Routes
app.use('/api/auth', authRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Set up the server to listen on a specified port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
