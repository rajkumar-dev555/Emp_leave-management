
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Alert,
} from '@mui/material';
import axios from 'axios';

const AddLeaveType = () => {
  const [leaveType, setLeaveType] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleAdd = async () => {
    if (!leaveType.trim()) {
      setError('Leave Type is required.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/leave-types', {
        name: leaveType,
        description,
      });
      setSuccess(true);
      setLeaveType('');
      setDescription('');
      setError('');
    } catch (err) {
      console.error('Error adding leave type:', err);
      setError('Failed to add leave type.');
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Add Leave Type
      </Typography>

      <Card elevation={3}>
        <CardContent>
          {success && (
            <Alert severity="success" onClose={() => setSuccess(false)}>
              Leave type added successfully!
            </Alert>
          )}
          {error && (
            <Alert severity="error" onClose={() => setError('')}>
              {error}
            </Alert>
          )}
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              fullWidth
              label="Leave Type"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            />
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              sx={{ alignSelf: 'center' }}
            >
              Add
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddLeaveType;

