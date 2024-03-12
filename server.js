const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


async function createConnection() {
  // Create connection
  const db = await mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'B@hsir6113',
    database: 'green_commute'
  });

  console.log('MySQL connected...');
  return db;
}

const db = createConnection();

// Get challenges
app.get('/challenges', async (req, res) => {
  const dbInstance = await db;
  let sql = 'SELECT * FROM challenges';
  dbInstance.query(sql, (err, results) => {
    if(err) throw err;
    console.log("Challenges fetched...");
    res.send(results);
  });
});

// Get leaderboard
app.get('/leaderboard', async (req, res) => {
  const dbInstance = await db;
  let sql = 'SELECT * FROM leaderboard'; // Replace 'leaderboard' with your actual leaderboard table name
  dbInstance.query(sql, (err, results) => {
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



const bcrypt = require('bcrypt');

// Signup
app.post('/signup', async (req, res) => {
  const { UserName, FirstName, LastName, Email, Password } = req.body;

  if (!UserName || !FirstName || !LastName || !Email || !Password) {
    return res.status(400).send('Please provide all required fields');
  }
  
  try {
    // Get database connection from the pool
    const db = await createConnection();
    
    // Check if the user already exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE UserName = ?', [UserName]);
    
    if (existingUser.length > 0) {
      // User exists, send a 409 Conflict response
      return res.status(409).json({ message: 'Username already exists' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);
    
    const newUser = [UserName, FirstName, LastName, Email, hashedPassword];
    const sql = 'INSERT INTO users (UserName, FirstName, LastName, Email, Password) VALUES (?)';
    
    db.query(sql, [newUser])
      .then(result => {
        console.log('User added to database');
        res.send('User added to database');
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Server error');
      });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


// Get a specific user by ID
app.get('/users/:id', (req, res) => {
  let sql = 'SELECT UserName, FirstName, LastName, Email FROM users WHERE UserID = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if(err) throw err;
    console.log(`User ${req.params.id} fetched...`);
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


// Login
app.post('/login', async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).send('Please provide email and password');
  }

  try {
    // Get database connection from the pool
    const dbInstance = await db;

    // Check if the user exists
    const [user] = await dbInstance.query('SELECT * FROM users WHERE Email = ?', [Email]);

    if (user.length > 0) {
      // User exists, check password
      const match = await bcrypt.compare(Password, user[0].Password);

      if (match) {
        // Passwords match, send a 200 OK response
        return res.status(200).json({ message: 'Login successful' });
      } else {
        // Passwords do not match, send a 401 Unauthorized response
        return res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      // User does not exist, send a 404 Not Found response
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});