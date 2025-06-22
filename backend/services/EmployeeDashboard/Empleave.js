const express = require('express');
const router = express.Router();
const db = require('../../db'); // ✅ Fix path
// const pool = require('../../db')


// Get all leaves
// router.get('/', (req, res) => {
//   db.query('SELECT * FROM leaves ORDER BY id DESC', (err, result) => {
//     if (err) return res.status(500).json({ success: false, error: err.message });
//     res.json(result);
//   });
// });


// router.get('/', async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM leaves ORDER BY id DESC'); // ✅ use await and destructuring
//     res.json({ data: rows }); // ✅ wrap in { data: ... }
//   } catch (err) {
//     console.error('Error fetching leaves:', err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });


// this uniqu leave histroy 
// router.get('/', async (req, res) => {
//   const { emp_id } = req.query; // 👈 get employee ID from query

//   try {
//     const [rows] = await pool.query(
//       'SELECT * FROM leaves WHERE emp_id = ? ORDER BY id DESC',
//       [emp_id]
//     );
//     res.json({ data: rows });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get('/', async (req, res) => {
//   const { emp_id } = req.query;

//   if (!emp_id) {
//     return res.status(400).json({ error: 'Employee ID is required' });
//   }

//   try {
//     const [rows] = await pool.query(
//       'SELECT * FROM leaves WHERE emp_id = ? ORDER BY id DESC',
//       [emp_id]
//     );
//     res.json({ data: rows });
//   } catch (err) {
//     console.error('Database error:', err); // 🔍 log full error
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });




// Add a leave
// router.post('/', (req, res) => {
//   const { from_date, to_date, leave_type, description } = req.body;
//   const posting_date = new Date();
//   const admin_remark = 'Waiting for Approval';
//   const status = 'Waiting for Approval';

//   const sql = `INSERT INTO leaves 
//     (from_date, to_date, leave_type, description, posting_date, admin_remark, status) 
//     VALUES (?, ?, ?, ?, ?, ?, ?)`;

//   const values = [from_date, to_date, leave_type, description, posting_date, admin_remark, status];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error('Insert error:', err.message);
//       return res.status(500).json({ success: false, message: 'Database insert failed' });
//     }
//     res.json({ success: true, id: result.insertId });
//   });
// });



// this correct work apply leave post
// router.post('/', async (req, res) => {
//   try {
//     const { from_date, to_date, leave_type, description, posting_date, admin_remark, status } = req.body;
//     const sql = `INSERT INTO leaves (from_date, to_date, leave_type, description, posting_date, admin_remark, status)
//                  VALUES (?, ?, ?, ?, ?, ?, ?)`;
//     const values = [from_date, to_date, leave_type, description, posting_date, admin_remark, status];
//     await db.query(sql, values);
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });


// router.post('/', async (req, res) => {
//   const { emp_id, from_date, to_date, leave_type, description } = req.body;

//   try {
//     const [result] = await db.query(
//       `INSERT INTO leaves (emp_id, from_date, to_date, leave_type, description, posting_date, status)
//        VALUES (?, ?, ?, ?, ?, NOW(), ?)`,
//       [emp_id, from_date, to_date, leave_type, description, 'Waiting']
//     );

//     res.json({ success: true, message: 'Leave applied successfully' });
//   } catch (err) {
//     console.error('Apply Leave Error:', err);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });


// router.post('/', async (req, res) => {
//   try {
//     const { emp_id, from_date, to_date, leave_type, description } = req.body;

//     const sql = `
//       INSERT INTO leaves (emp_id, from_date, to_date, leave_type, description, status)
//       VALUES (?, ?, ?, ?, ?, 'Waiting')
//     `;

//     const [result] = await pool.query(sql, [
//       emp_id,
//       from_date,
//       to_date,
//       leave_type,
//       description,
//     ]);

//     res.json({ success: true, message: 'Leave applied successfully', data: result });
//   } catch (error) {
//     console.error('Apply Leave Error:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });


// // GET pending leaves
// router.get('/pending', async (req, res) => {
//   try {
//     const [rows] = await db.query(`
//       SELECT
//         leaves.id,
//         leaves.leavetype AS leave_type,
//         leaves.posting_date,
//         leaves.status,
//         employees.first_name,
//         employees.last_name
//       FROM leaves
//       JOIN employees ON leaves.emp_id = employees.id
//       WHERE leaves.status = 'Waiting for Approval'
//       ORDER BY leaves.id DESC
//     `);
//     res.json({ data: rows });
//   } catch (err) {
//     console.error('Error fetching pending leaves:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// GET /api/leaves/pending?email=raj@example.com
router.get('/pending', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        leaves.id,
        leaves.leave_type,
        leaves.from_date,
        leaves.to_date,
        leaves.description,
        leaves.posting_date,
        leaves.status,
        leaves.admin_remark,
        users.name
      FROM leaves
      JOIN users ON leaves.user_id = users.id
      WHERE LOWER(leaves.status) = 'waiting'
      ORDER BY leaves.id DESC
    `);

    res.json({ data: rows });
  } catch (err) {
    console.error('Error fetching pending leaves:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// the leave apporved or not appored api 

router.put('/:id/status', async (req, res) => {
  const { status, admin_remark } = req.body;
  const leaveId = req.params.id;

  try {
    await db.query(
      'UPDATE leaves SET status = ?, admin_remark = ? WHERE id = ?',
      [status, admin_remark, leaveId]
    );
    res.json({ success: true, message: 'Leave status updated' });
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});


// GET: Filter leaves by status (Approved or Not Approved) in separte page show
router.get('/status/:status', async (req, res) => {
  const { status } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT
        leaves.id,
        users.name AS empName,
        leaves.leave_type,
        leaves.posting_date,
        leaves.status
      FROM leaves
      JOIN users ON leaves.user_id = users.id
      WHERE LOWER(leaves.status) = ?
      ORDER BY leaves.id DESC
    `, [status.toLowerCase()]);
    res.json({ data: rows });
  } catch (err) {
    console.error('Error fetching leaves by status:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// GET: All Leaves History page admin 
// router.get('/all', async (req, res) => {
//   try {
//     const [rows] = await db.query(`
//       SELECT 
//         leaves.id,
//         leaves.leave_type,
//         leaves.from_date,
//         leaves.to_date,
//         leaves.posting_date,
//         leaves.status,
//         leaves.admin_remark,
//         users.name AS empName
//       FROM leaves
//       JOIN users ON leaves.user_id = users.id
//       ORDER BY leaves.id DESC
//     `);
//     res.json({ data: rows });
//   } catch (err) {
//     console.error("❌ Failed to fetch all leaves:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.get('/all', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        leaves.id,
        leaves.leave_type,
        leaves.from_date,
        leaves.to_date,
        leaves.posting_date,
        leaves.status,
        leaves.admin_remark,
        users.name AS empName
      FROM leaves
      JOIN users ON leaves.user_id = users.id
      WHERE LOWER(leaves.status) != 'waiting'
      ORDER BY leaves.id DESC
    `);

    res.json({ data: rows });
  } catch (err) {
    console.error('❌ Error fetching leave history:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// GET details for a specific leave id
// router.get('/:id', async (req, res) => {
//   const id = req.params.id;
//   try {
//     const [rows] = await db.query(`
//       SELECT
//         leaves.id, leaves.leavetype AS leave_type, leaves.posting_date,
//         leaves.status, employees.id AS emp_id, employees.first_name, employees.last_name,
//         employees.gender, employees.empcode, employees.mobile,
//         leaves.from_date, leaves.to_date, leaves.description, leaves.admin_remark, leaves.action_taken_date
//       FROM leaves
//       JOIN employees ON leaves.emp_id = employees.id
//       WHERE leaves.id = ?
//     `, [id]);

//     if (!rows.length) return res.status(404).json({ success: false, message: 'Leave not found' });
//     res.json({ success: true, data: rows[0] });
//   } catch (err) {
//     console.error('GET /:id error:', err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });


// router.get('/', async (req, res) => {
//   const { emp_id } = req.query;

//   if (!emp_id) {
//     return res.status(400).json({ success: false, message: 'emp_id is required' });
//   }

//   try {
//     const [rows] = await db.query(
//       `SELECT id, emp_id, from_date, to_date, leave_type, description, posting_date, admin_remark, status 
//        FROM leaves WHERE emp_id = ? ORDER BY id DESC`,
//       [emp_id]
//     );

//     res.json({ success: true, data: rows });
//   } catch (err) {
//     console.error('GET /api/leaves error:', err);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });


// router.get('/:emp_id', async (req, res) => {
//   const emp_id = req.params.emp_id;

//   try {
//     const sql = `
//       SELECT from_date, to_date, leave_type, description, posting_date, status, admin_remark
//       FROM leaves
//       WHERE emp_id = ?
//       ORDER BY posting_date DESC
//     `;
//     const [rows] = await pool.query(sql, [emp_id]);
//     res.json({ success: true, leaves: rows });
//   } catch (error) {
//     console.error('Fetch Leave History Error:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });


// router.get('/:id', async (req, res) => {
//   try {
//     const [rows] = await db.query(`
//       SELECT 
//         leaves.*, 
//         employees.emp_name, employees.emp_code, employees.gender, employees.mobile
//       FROM leaves 
//       JOIN employees ON leaves.emp_id = employees.id
//       WHERE leaves.id = ?
//     `, [req.params.id]);

//     if (rows.length === 0) {
//       return res.status(404).json({ success: false, message: 'Leave not found' });
//     }

//     res.json({ success: true, data: rows[0] });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });


// POST: Apply Leave
router.post('/', async (req, res) => {
  try {
    const { user_id, from_date, to_date, leave_type, description } = req.body;

    // Validate user_id exists
    const [userCheck] = await db.query('SELECT id FROM users WHERE id = ?', [user_id]);
    if (userCheck.length === 0) {
      return res.status(400).json({ success: false, message: '❌ User not found.' });
    }

    await db.query(
      `INSERT INTO leaves (user_id, from_date, to_date, leave_type, description, posting_date, status)
   VALUES (?, ?, ?, ?, ?, NOW(), ?)`,
      [user_id, from_date, to_date, leave_type, description, 'Waiting']
    );

    res.status(200).json({ success: true, message: '✅ Leave applied successfully!' });
  } catch (error) {
    console.error('Apply Leave Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// GET: Leave history by user speacifik
// router.get('/:emp_id', async (req, res) => {
//   try {
//     const emp_id = req.params.emp_id;
//     const [rows] = await db.query(`
//       SELECT from_date, to_date, leave_type, description, posting_date, status, admin_remark
//       FROM leaves WHERE emp_id = ? ORDER BY posting_date DESC
//     `, [emp_id]);

//     res.json({ success: true, leaves: rows });
//   } catch (error) {
//     console.error('Fetch Leave History Error:', error);
//     res.status(500).json({ success: false, message: '❌ Internal Server Error' });
//   }
// });

router.get('/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const [rows] = await db.query(`
    SELECT from_date, to_date, leave_type, description, posting_date, status, admin_remark
    FROM leaves WHERE user_id = ? ORDER BY posting_date DESC
  `, [user_id]);

  res.json({ success: true, leaves: rows });
});






module.exports = router;
