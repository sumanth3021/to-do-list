const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'AuthDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }

  console.log('Connected to the database as ID ' + connection.threadId);

  // Perform database operations here

  // Release the connection when done
  connection.release();
});

// Close the connection pool when your application exits
process.on('exit', () => {
  pool.end();
});
