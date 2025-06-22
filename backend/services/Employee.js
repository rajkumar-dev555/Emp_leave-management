const express = require('express');
const pool = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {
  const {
    code, firstName, lastName, email, password,
    gender, birthDate, department, country, city, address, mobile
  } = req.body;

  try {
   
    const [check] = await pool.query('SELECT * FROM employees WHERE email = ? OR code = ?', [email, code]);
    if (check.length > 0) {
      return res.json({ success: false, message: 'Employee with this email or code already exists' });
    }

    await pool.query(
      `INSERT INTO employees (code, first_name, last_name, email, password, gender, birth_date, department, country, city, address, mobile)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [code, firstName, lastName, email, password, gender, birthDate, department, country, city, address, mobile]
    );

    await pool.query(
      `INSERT INTO users (email, password, name, role)
       VALUES (?, ?, ?, ?)`,
      [email, password, `${firstName} ${lastName}`, 'employee']
    );

    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});




router.get('/email/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const [rows] = await db.query('SELECT firstname, employeeCode FROM employees WHERE email = ?', [email]);
    if (rows.length > 0) {
      res.json({ success: true, employee: rows[0] });
    } else {
      res.json({ success: false, message: 'Employee not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM employees ORDER BY id DESC');
  res.json(rows);
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const f = req.body;
  await pool.execute(
    `UPDATE employees SET
       first_name=?, last_name=?, email=?, gender=?, birth_date=?, department=?, country=?, city=?, address=?, mobile=?
     WHERE id=?`,
    [f.firstName, f.lastName, f.email, f.gender, f.birthDate, f.department, f.country, f.city, f.address, f.mobile, id]
  );
  res.json({ message: 'Updated' });
});


router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [userId]);
    if (rows.length > 0) {
      res.json({ success: true, employee: rows[0] });
    } else {
      res.status(404).json({ success: false, message: 'Employee not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});





router.delete('/:id', async (req, res) => {
  await pool.execute('DELETE FROM employees WHERE id=?', [req.params.id]);
  res.json({ message: 'Deleted' });
});

router.post('/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const [rows] = await db.query('SELECT password FROM employees WHERE email = ?', [email]);

    if (rows.length === 0) return res.json({ success: false, message: 'User not found' });

    const currentPassword = rows[0].password;
    if (currentPassword !== oldPassword) {
      return res.json({ success: false, message: 'Old password is incorrect' });
    }

    await db.query('UPDATE employees SET password = ? WHERE email = ?', [newPassword, email]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});





module.exports = router;
