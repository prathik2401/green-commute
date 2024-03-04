const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


// Create connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'B@hsir6113',
  database: 'green_commute'
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

// Signup
app.post('/signup', (req, res) => {
  const { UserName, FirstName, LastName, Email, Password } = req.body;

  // Perform validation
  if (!UserName || !FirstName || !LastName || !Email || !Password) {
    return res.status(400).send('Please provide all required fields');
  }

  const user = [UserName, FirstName, LastName, Email, Password];
const sql = 'INSERT INTO users (UserName, FirstName, LastName, Email, Password) VALUES (?)';

db.query(sql, [user], (err, result) => {
  if (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
  res.send('User added to database');
});
});

app.get('/signup', (req, res) => {
  let sql = 'SELECT * FROM users'; // Replace 'leaderboard' with your actual leaderboard table name
  db.query(sql, (err, results) => {
    if(err) throw err;
    console.log("User data fetched...");
    res.send(results);
  });
});

// Get a specific challenge by ID
app.get('/challenges/:id', (req, res) => {
  let sql = 'SELECT ChallengeName, Description FROM challenges WHERE ChallengeID = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if(err) throw err;
    console.log(`Challenge ${req.params.id} fetched...`);
    res.send(results);
  });
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});