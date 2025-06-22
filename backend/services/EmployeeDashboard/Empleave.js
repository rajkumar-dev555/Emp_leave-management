const express = require('express');
const router = express.Router();
const db = require('../../db'); 

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
    console.error(' Error fetching leave history:', err);
    res.status(500).json({ error: 'Server error' });
  }
});



router.post('/', async (req, res) => {
  try {
    const { user_id, from_date, to_date, leave_type, description } = req.body;

    
    const [userCheck] = await db.query('SELECT id FROM users WHERE id = ?', [user_id]);
    if (userCheck.length === 0) {
      return res.status(400).json({ success: false, message: ' User not found.' });
    }

    await db.query(
      `INSERT INTO leaves (user_id, from_date, to_date, leave_type, description, posting_date, status)
   VALUES (?, ?, ?, ?, ?, NOW(), ?)`,
      [user_id, from_date, to_date, leave_type, description, 'Waiting']
    );

    res.status(200).json({ success: true, message: ' Leave applied successfully!' });
  } catch (error) {
    console.error('Apply Leave Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



router.get('/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const [rows] = await db.query(`
    SELECT from_date, to_date, leave_type, description, posting_date, status, admin_remark
    FROM leaves WHERE user_id = ? ORDER BY posting_date DESC
  `, [user_id]);

  res.json({ success: true, leaves: rows });
});



module.exports = router;
