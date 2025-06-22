const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/dashboard/counts', async (req, res) => {
  try {
    const [[{ empCount }]] = await db.query('SELECT COUNT(*) AS empCount FROM users WHERE role = ?', ['employee']);
    const [[{ deptCount }]] = await db.query('SELECT COUNT(*) AS deptCount FROM departments');
    const [[{ leaveTypeCount }]] = await db.query('SELECT COUNT(*) AS leaveTypeCount FROM leave_types');
    res.json({ empCount, deptCount, leaveTypeCount });
  } catch (err) {
    console.error('Error fetching dashboard counts 🎯', err);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;

