import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
} from '@mui/material';
import axios from 'axios';

const AddDepartment = () => {

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    shortName: '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

const [error, setError] = useState('');
  const handleAdd = async () => {
  try {
    await axios.post('http://localhost:5000/api/departments', formData);
    setSuccess(true);
    setFormData({ code: '', name: '', shortName: '' });
    setError(''); 
  } catch (error) {
    console.error('Error adding department:', error);
    if (error.response && error.response.status === 409) {
      setError('Department code already exists');
    } else {
      setError('Server error. Please try again later.');
    }
  }
};
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          Add Department
        </Typography>

        {success && <Alert severity="success">Department added successfully!</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Enter Department Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Enter Department Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Enter Short Department Name"
            name="shortName"
            value={formData.shortName}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddDepartment;