// const express = require('express');
// const cors = require('cors');
// const departmentRoutes = require('./services/Deparment.js'); // case-sensitive

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use(departmentRoutes);


// // User Login
// app.post('/api/login', (req, res) => {
//   const { email, password, role } = req.body;
//   db.query(
//     'SELECT * FROM users WHERE email = ? AND password = ? AND role = ?',
//     [email, password, role],
//     (err, result) => {
//       if (err) return res.status(500).send(err);
//       if (result.length > 0) res.send(result[0]);
//       else res.status(401).send({ message: 'Invalid credentials' });
//     }
//   );
// });


// app.listen(5000, () => {
//   console.log('Backend running at http://localhost:5000');
// });

// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // ✅ Import database connection

const app = express();
const PORT = 5000;
app.use(bodyParser.json());

const departmentRoutes = require('./services/Deparment.js'); // case-sensitive
const leaveTypeRoutes = require('./services/LeaveTypes.js');
const employeeRoutes = require('./services/Employee');
const leaveRoutes = require('./services/EmployeeDashboard/Empleave');
const adminRoutes = require('./services/Admin.js');
// const leaveTypeRouter = require('./routes/leaveType');
// Middleware
app.use(cors());
app.use(express.json());



app.use(departmentRoutes);
app.use('/api/leave-types', leaveTypeRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/admin', adminRoutes);

// ✅ Login API
// app.post('/api/login', (req, res) => {
//   const { email, password, role } = req.body;

//   if (!email || !password || !role) {
//     return res.status(400).send({ message: 'Missing fields' });
//   }

//   const query = 'SELECT * FROM users WHERE email = ? AND password = ? AND role = ?';
//   db.query(query, [email, password, role], (err, result) => {
//     if (err) {
//       console.error('❌ Login query failed:', err);
//       return res.status(500).send({ message: 'Server error' });
//     }

//     if (result.length > 0) {
//       res.status(200).send(result[0]);
//     } else {
//       res.status(401).send({ message: 'Invalid credentials' });
//     }
//   });
// });


app.post('/api/login', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ? AND password = ? AND role = ?',
      [email, password, role]
    );

    if (rows.length > 0) {
      console.log(rows[0]);
      res.status(200).send(rows[0]);
    } else {
      res.status(401).send({ message: 'Invalid credentials or not added by admin' });
    }
  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).send({ message: 'Server error' });
  }
});





app.listen(5000, () => {
  console.log('Backend running at http://localhost:5000');
});