// src/components/UpdateLeaveType.js
import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper
} from '@mui/material';
import axios from 'axios';

const UpdateLeaveType = ({
  editingId,
  setEditingId,
  fetchLeaveTypes,
  editData,
  setEditData
}) => {
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/leave-types/${editingId}`, editData);
      setEditingId(null);
      fetchLeaveTypes();
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>Update Leave Type</Typography>

      <form onSubmit={handleUpdate}>
        <TextField
          label="Leave Type"
          fullWidth
          margin="normal"
          value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          multiline
          rows={4}
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

export default UpdateLeaveType;
