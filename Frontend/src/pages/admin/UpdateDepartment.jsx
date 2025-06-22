import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper
} from '@mui/material';
import axios from 'axios';

const UpdateDepartment = ({
  editingId,
  setEditingId,
  fetchDepartments,
  editData,
  setEditData
}) => {
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/departments/${editingId}`, editData);
      setEditingId(null);
      fetchDepartments();
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>Update Department</Typography>

      <form onSubmit={handleUpdate}>
        <TextField
          label="Department Code"
          fullWidth
          margin="normal"
          value={editData.code}
          onChange={(e) => setEditData({ ...editData, code: e.target.value })}
        />
        <TextField
          label="Department Name"
          fullWidth
          margin="normal"
          value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
        />
        <TextField
          label="Short Name"
          fullWidth
          margin="normal"
          value={editData.short_name}
          onChange={(e) => setEditData({ ...editData, short_name: e.target.value })}
        />

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" type="submit">
            Update
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setEditingId(null)}>
            Cancel
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default UpdateDepartment;


//   {editingId && (
//   <Box mt={4} maxWidth={500} mx="auto">
//     <Typography variant="h6" mb={2}>Update Department</Typography>
//     <Paper sx={{ p: 3 }}>
//       <form onSubmit={async (e) => {
//         e.preventDefault();
//         try {
//           await axios.put(`http://localhost:5000/api/departments/${editingId}`, editData);
//           setEditingId(null);
//           fetchDepartments();
//         } catch (error) {
//           console.error('Update failed:', error);
//         }
//       }}>
//         <TextField
//           fullWidth
//           label="Department Code"
//           name="code"
//           value={editData.code}
//           onChange={(e) => setEditData({ ...editData, code: e.target.value })}
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="Department Name"
//           name="name"
//           value={editData.name}
//           onChange={(e) => setEditData({ ...editData, name: e.target.value })}
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="Short Department Code"
//           name="short_name"
//           value={editData.short_name}
//           onChange={(e) => setEditData({ ...editData, short_name: e.target.value })}
//           margin="normal"
//         />
//         <Box display="flex" justifyContent="space-between" mt={2}>
//           <Button variant="contained" type="submit">Update</Button>
//           <Button variant="outlined" color="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
//         </Box>
//       </form>
//     </Paper>
//   </Box>
// )}