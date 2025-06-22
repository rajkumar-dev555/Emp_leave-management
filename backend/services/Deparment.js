

const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.post('/api/departments', async (req, res) => {
  const { code, name, shortName } = req.body;
  console.log("Request received:", req.body);

  try {
    await db.query(
      'INSERT INTO departments (code, name, short_name) VALUES (?, ?, ?)',
      [code, name, shortName]
    );
    res.status(201).json({ message: 'Department added' });
  } catch (err) {
    console.error('Error adding department:', err);
    res.status(500).json({ message: 'Failed to add department' });
  }
});


router.get('/api/departments', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM departments');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching departments:', err);
    res.status(500).json({ message: 'Failed to fetch departments' });
  }
});


router.get('/api/departments/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM departments WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});


router.put('/api/departments/:id', (req, res) => {
  const { code, name, short_name } = req.body;
  const id = req.params.id;

  db.query(
    'UPDATE departments SET code = ?, name = ?, short_name = ? WHERE id = ?',
    [code, name, short_name, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Department updated successfully' });
    }
  );
});


router.delete('/api/departments/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM departments WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Department deleted successfully' });
  });
});

module.exports = router;
