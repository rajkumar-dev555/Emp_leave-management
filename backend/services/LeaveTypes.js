const express = require('express');
const  router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Leave Type name is required.' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO leave_types (name, description) VALUES (?, ?)',
      [name, description]
    );
    res.status(201).json({ message: 'Leave type added successfully.', id: result.insertId });
  } catch (err) {
    console.error('Error adding leave type:', err);
    res.status(500).json({ error: 'Failed to add leave type.' });
  }
});


router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM leave_types ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM leave_types WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  const { name, description } = req.body;
  const id = req.params.id;

  try {
    await pool.query(
      'UPDATE leave_types SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );
    res.json({ message: 'Leave type updated successfully' });
  } catch (err) {
    console.error('Error updating leave type:', err);
    res.status(500).json({ error: 'Failed to update leave type' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM leave_types WHERE id = ?', [req.params.id]);
    res.json({ message: 'Leave type deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
