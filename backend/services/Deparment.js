// const express = require('express');
// const router = express.Router();
// const db = require('../db'); // <-- we will set this up next

// // Get Departments
// router.get('/api/departments', (req, res) => {
//   db.query('SELECT * FROM departments', (err, results) => {
//     if (err) return res.status(500).json(err);
//     res.json(results);
//   });
// });

// router.get('/api/departments', (req, res) => {
//   db.query('SELECT * FROM departments', (err, results) => {
//     if (err) return res.status(500).json(err);
//     // Convert short_name to shortName
//     const formattedResults = results.map((dept) => ({
//       ...dept,
//       shortName: dept.short_name,
//     }));
//     res.json(formattedResults);
//   });
// });

// // Add Department
// router.post('/api/departments', (req, res) => {
//   const { code, name, shortName } = req.body;
//   db.query(
//     'INSERT INTO departments (code, name, short_name) VALUES (?, ?, ?)',
//     [code, name, shortName],
//     (err, result) => {
//       if (err) return res.status(500).json(err);
//       res.status(201).json({ message: 'Department added' });
//     }
//   );
// });


// router.put('/api/departments/:id', (req, res) => {
//   const { code, name, short_name } = req.body;
//   const id = req.params.id;
//   db.query(
//     'UPDATE departments SET code = ?, name = ?, short_name = ? WHERE id = ?',
//     [code, name, short_name, id],
//     (err, result) => {
//       if (err) return res.status(500).json(err);
//       res.json({ message: 'Department updated' });
//     }
//   );
// });


// index.js or routes file
// app.put('/api/departments/:id', (req, res) => {
//   const { code, name, short_name } = req.body;
//   const id = req.params.id;

//   db.query(
//     'UPDATE departments SET code = ?, name = ?, short_name = ? WHERE id = ?',
//     [code, name, short_name, id],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Database error', error: err });
//       }
//       res.json({ message: 'Department updated successfully' });
//     }
//   );
// });



// Delete Department
// router.delete('/api/departments/:id', (req, res) => {
//   const id = req.params.id;
//   db.query('DELETE FROM departments WHERE id = ?', [id], (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json({ message: 'Department deleted' });
//   });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../db'); // Import DB

// // Add Department
// router.post('/api/departments', (req, res) => {
//   const { code, name, shortName } = req.body;
//   db.query(
//     'INSERT INTO departments (code, name, short_name) VALUES (?, ?, ?)',
//     [code, name, shortName],
//     (err, result) => {
//       if (err) return res.status(500).json(err);
//       res.status(201).json({ message: 'Department added' });
//     }
//   );
// });


// router.post('/api/departments', (req, res) => {
//   const { code, name, shortName } = req.body;

//   // Check if department code already exists
//   db.query('SELECT * FROM departments WHERE code = ?', [code], (err, result) => {
//     if (err) return res.status(500).json(err);

//     if (result.length > 0) {
//       return res.status(409).json({ message: 'Department code already exists' }); // Conflict
//     }

//     // If not duplicate, insert
//     db.query(
//       'INSERT INTO departments (code, name, short_name) VALUES (?, ?, ?)',
//       [code, name, shortName],
//       (err, result) => {
//         if (err) return res.status(500).json(err);
//         res.status(201).json({ message: 'Department added' });
//       }
//     );
//   });
// });

// router.post('/api/departments', (req, res) => {
//   const { code, name, shortName } = req.body;
//   console.log('Request received:', req.body); // ✅ Step 1

//   db.query('SELECT * FROM departments WHERE code = ?', [code], (err, result) => {
//     if (err) {
//       console.error('Error in SELECT:', err); // ✅ Step 2
//       return res.status(500).json({ message: 'Database select error' });
//     }

//     if (result.length > 0) {
//       console.log('Duplicate found for code:', code); // ✅ Step 3
//       return res.status(409).json({ message: 'Department code already exists' });
//     }

//     db.query(
//       'INSERT INTO departments (code, name, short_name) VALUES (?, ?, ?)',
//       [code, name, shortName],
//       (err, result) => {
//         if (err) {
//           console.error('Error in INSERT:', err); // ✅ Step 4
//           return res.status(500).json({ message: 'Insert failed' });
//         }

//         console.log('Department inserted:', result); // ✅ Step 5
//         res.status(201).json({ message: 'Department added successfully' });
//       }
//     );
//   });
// });


// router.post('/api/departments', (req, res) => {
//   const { code, name, shortName } = req.body;

//   console.log('Request received:', req.body);

//   if (!code || !name || !shortName) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   db.query('SELECT * FROM departments WHERE code = ?', [code], (err, result) => {
//     if (err) {
//       console.error('SELECT error:', err);
//       return res.status(500).json({ message: 'Database SELECT error' });
//     }

//     if (result.length > 0) {
//       console.log('Duplicate code:', code);
//       return res.status(409).json({ message: 'Department code already exists' });
//     }

//     db.query(
//       'INSERT INTO departments (code, name, short_name) VALUES (?, ?, ?)',
//       [code, name, shortName],
//       (err, result) => {
//         if (err) {
//           console.error('INSERT error:', err);
//           return res.status(500).json({ message: 'Database INSERT error' });
//         }

//         console.log('Inserted department:', result);
//         res.status(201).json({ message: 'Department added successfully' });
//       }
//     );
//   });
// });


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

// Get all departments
// router.get('/api/departments', (req, res) => {
//   db.query('SELECT * FROM departments', (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json(result);
//   });
// });




router.get('/api/departments', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM departments');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching departments:', err);
    res.status(500).json({ message: 'Failed to fetch departments' });
  }
});

// Get department by ID
router.get('/api/departments/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM departments WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

// Update department
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

// Delete department
router.delete('/api/departments/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM departments WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Department deleted successfully' });
  });
});

module.exports = router;
