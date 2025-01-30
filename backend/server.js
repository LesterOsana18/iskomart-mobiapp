const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'LesterOsana.18',
    database: 'iskomart',
});

app.post('/users', (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    const values = [
        req.body.username,
        req.body.password
    ]
    db.query(sql, values, (err, data) => {
        if (err) return res.json("Login failed! \nInvalid username or password.");
        return res.json(data);  
    })
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});