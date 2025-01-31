const bcrypt = require('bcrypt');
const db = require('../db');

const registerUser = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  // Check if the username already exists
  const existingUserQuery = 'SELECT * FROM users WHERE username = ?';
  db.execute(existingUserQuery, [username], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const insertUserQuery = 'INSERT INTO users (firstName, lastName, username, email, password) VALUES (?, ?, ?, ?, ?)';
    db.execute(insertUserQuery, [firstName, lastName, username, email, hashedPassword], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });

      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.execute(query, [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length > 0) {
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
};

module.exports = { loginUser, registerUser };