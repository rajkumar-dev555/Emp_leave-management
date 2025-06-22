
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'newpassword', 
  database: 'leave_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(() => console.log(' Connected to MySQL DB'))
  .catch((err) => console.error(' DB connection failed:', err.message));

module.exports = pool;
