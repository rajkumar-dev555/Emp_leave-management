// const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'mysqlpassword',
//   database: 'leave_management'
// });

// module.exports = db;


// db.js
// const mysql = require('mysql2/promise');

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'newpassword', // ✅ your actual password
//   database: 'leave_management'
// });

// db.connect((err) => {
//   if (err) {
//     console.error('❌ DB connection failed:', err.message);
//   } else {
//     console.log('✅ Connected to MySQL DB');
//   }
// });

// module.exports = db;

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'newpassword', // ✅ your MySQL password
  database: 'leave_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Optional test connection
pool.getConnection()
  .then(() => console.log('✅ Connected to MySQL DB'))
  .catch((err) => console.error('❌ DB connection failed:', err.message));

module.exports = pool;
