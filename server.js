const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(express.json());

async function createConnection() {
  // Create connection
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'B@hsir6113',
    database: 'green_commute'
  });

  console.log('MySQL connected...');
  return db;
}

app.listen('3000', () => {
  console.log('Server started on port 3000');
});

// Get challenges
app.get('/challenges', async (req, res) => {
  try {
    const dbInstance = await createConnection();
    let sql = 'SELECT * FROM challenges';
    const [results] = await dbInstance.query(sql);
    console.log("Challenges fetched...");
    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get leaderboard
app.get('/leaderboard', async (req, res) => {
  try {
    const dbInstance = await createConnection();
    let sql = `
      SELECT lb.*, u.UserName
      FROM overallleaderboard AS lb
      INNER JOIN users AS u ON lb.UserID = u.UserID
    `;
    const [results] = await dbInstance.query(sql);
    console.log("Leaderboard data fetched...");
    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


// Get achievements for a specific user
app.get('/achievements/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const dbInstance = await createConnection();
    let sql = 'SELECT * FROM userbadge WHERE UserID = ?';
    const [results] = await dbInstance.query(sql, [userId]);
    console.log(`Achievements fetched for user ${userId}`);
    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

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
app.get('/users/:id', async (req, res) => {
  let sql = 'SELECT UserName, FirstName, LastName, Email FROM users WHERE UserID = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if(err) throw err;
    console.log(`User ${req.params.id} fetched...`);
    res.send(results);
  });
});

// Get a specific challenge by ID
app.get('/challenges/:id', async (req, res) => {
  try {
    // Ensure the database connection is established before querying
    const dbInstance = await createConnection();
    
    let sql = 'SELECT ChallengeName, Description FROM challenges WHERE ChallengeID = ?';
    const [results] = await dbInstance.query(sql, [req.params.id]);
    
    console.log(`Challenge ${req.params.id} fetched...`);
    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Login
app.post('/login', async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).send('Please provide email and password');
  }

  try {
    // Get database connection from the pool
    const dbInstance = await createConnection();

    // Check if the user exists
    const [user] = await dbInstance.query('SELECT * FROM users WHERE Email = ?', [Email]);

    if (user.length > 0) {
      // User exists, check password
      const match = await bcrypt.compare(Password, user[0].Password);

      if (match) {
        // Passwords match, send a 200 OK response with user data
        console.log('Login successful');
        const { UserName, FirstName, LastName, Email, UserID } = user[0]; // Destructure user object
        console.log(user);
        return res.status(200).json({ UserName, FirstName, LastName, Email, UserID }); // Send user data with corrected property names
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

// Server-side route to delete user
app.delete('/users/:id', async (req, res) => {
  try {
    const dbInstance = await createConnection();
    const userId = req.params.id;
    
    // Delete the user from the database
    await dbInstance.query('DELETE FROM users WHERE UserID = ?', [userId]);

    console.log(`User with ID ${userId} deleted`);
    res.status(200).send('User deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Route to handle updating EcoPoints when a button is clicked
app.post('/completeTrip/:userID', async (req, res) => {
  const userID = req.params.userID;
  
  try {
    const connection = await createConnection();
    
    // Call the stored procedure to update EcoPoints for the user
    await connection.query('CALL UpdateEcoPoints(?)', [userID]);
    
    connection.end(); // Close the connection after executing the query
    
    console.log(`EcoPoints updated for user with ID ${userID}`);
    res.status(200).send('EcoPoints updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Route to join a challenge
app.post('/joinChallenge', async (req, res) => {
  try {
    const { ChallengeID, UserID } = req.body;
    console.log('Received join challenge request:', req.body); // Log the received data
    const dbInstance = await createConnection();
    
    // Insert the ChallengeID and UserID into the trips table
    const sqlInsertTrip = 'INSERT INTO trips (ChallengeID, UserID) VALUES (?, ?);';
    await dbInstance.query(sqlInsertTrip, [ChallengeID, UserID]);

    // Check if the user already exists in the overallleaderboard
    const sqlCheckUser = 'SELECT * FROM overallleaderboard WHERE UserID = ?;';
    const [userRows] = await dbInstance.query(sqlCheckUser, [UserID]);

    // If the user doesn't exist in the overallleaderboard, insert them with TotalEcoPoints set to 0
    if (userRows.length === 0) {
      const sqlInsertUser = 'INSERT INTO overallleaderboard (UserID, TotalEcoPoints) VALUES (?, 0);';
      await dbInstance.query(sqlInsertUser, [UserID]);
    }
    
    console.log(`User with ID ${UserID} joined challenge with ID ${ChallengeID}`);
    res.status(200).send('User joined challenge successfully');
  } catch (error) {
    console.error('Error joining challenge:', error); // Log any errors that occur
    res.status(500).send('Server error');
  }
});


app.post('/completeChallenge', async (req, res) => {
  let dbInstance; // Declare dbInstance outside the try-catch block
  try {
    const { UserID, ChallengeID } = req.body;
    dbInstance = await createConnection(); // Initialize dbInstance
    console.log(UserID, ChallengeID);
    await dbInstance.beginTransaction(); // Begin transaction
    
    // Update TripCompleted value to 1 (completed) for the specific challenge and user
    const updateTripSql = 'UPDATE trips SET TripCompleted = 1 WHERE UserID = ? AND ChallengeID = ?';
    await dbInstance.query(updateTripSql, [UserID, ChallengeID]);
    
    // Fetch BadgeID from challenges table based on ChallengeID
    const [challengeResult] = await dbInstance.query('SELECT BadgeID FROM challenges WHERE ChallengeID = ?', [ChallengeID]);
    const BadgeID = challengeResult[0].BadgeID;
    
    // Execute stored procedure to update leaderboard
    const updateSql = 'CALL UpdateOverallLeaderboard(?)';
    await dbInstance.query(updateSql, [UserID]); // Call stored procedure with UserID
    
    // Insert badge into userbadge table
    const insertBadgeSql = 'INSERT INTO userbadge (UserID, BadgeID) VALUES (?, ?)';
    await dbInstance.query(insertBadgeSql, [UserID, BadgeID]);
    
    // Commit transaction
    await dbInstance.commit();
    
    console.log(`Challenge ${ChallengeID} completed for user with ID ${UserID}`);
    res.status(200).send('Challenge marked as completed successfully');
  } catch (error) {
    // Rollback transaction on error
    if (dbInstance) {
      await dbInstance.rollback();
    }
    console.error(error);
    res.status(500).send('Server error');
  }
});




// Get challenges for a specific user
app.get('/userChallenges', async (req, res) => {
  try {
    const { UserID } = req.query;
    const dbInstance = await createConnection();
    let sql = `
      SELECT c.*, t.TripCompleted
      FROM challenges c
      INNER JOIN trips t ON c.ChallengeID = t.ChallengeID
      WHERE t.UserID = ?
    `;
    const [results] = await dbInstance.query(sql, [UserID]);
    console.log(`Challenges fetched for user ${UserID}`);
    
    // Check TripCompleted value and update completed flag accordingly
    const challenges = results.map(challenge => ({
      ...challenge,
      completed: challenge.TripCompleted === 1
    }));

    res.send(challenges);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get achievements for a specific user
app.get('/userbadge/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const dbInstance = await createConnection();
    let sql = `
      SELECT b.BadgeName, b.Description
      FROM userbadge ub
      INNER JOIN badges b ON ub.BadgeID = b.BadgeID
      WHERE ub.UserID = ?
    `;
    const [results] = await dbInstance.query(sql, [userId]);
    console.log(results);
    console.log(`Achievements fetched for user ${userId}`);
    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
