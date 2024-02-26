const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors())

// Create connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'localhost123',
  database: 'green-commute'
});

// Connect
db.connect((err) => {
  if(err) throw err;
  console.log('MySQL connected...');
});

// Get challenges
app.get('/challenges', (req, res) => {
  let sql = 'SELECT * FROM challenges';
  db.query(sql, (err, results) => {
    if(err) throw err;
    console.log("Challenges fetched...");
    res.send(results);
  });;
});

// Get leaderboard
app.get('/leaderboard', (req, res) => {
  let sql = 'SELECT * FROM leaderboard'; // Replace 'leaderboard' with your actual leaderboard table name
  db.query(sql, (err, results) => {
    if(err) throw err;
    console.log("Leaderboard data fetched...");
    res.send(results);
  });
});

// Get achievements
app.get('/achievements', (req, res) => {
  let sql = 'SELECT * FROM achievements'; // Replace 'leaderboard' with your actual leaderboard table name
  db.query(sql, (err, results) => {
    if(err) throw err;
    console.log("Achievements data fetched...");
    res.send(results);
  });
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});