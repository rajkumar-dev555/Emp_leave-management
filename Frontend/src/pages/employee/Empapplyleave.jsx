
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Grid, MenuItem, Button } from '@mui/material';
import axios from 'axios';

export default function Empapplyleave() {
  const [employeeId, setEmployeeId] = useState(null);
  const [formData, setFormData] = useState({
    from_date: '',
    to_date: '',
    leave_type: '',
    description: ''
  });


useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser && storedUser.id) {
    setEmployeeId(storedUser.id);
  } else {
    alert(" User not found. Please login again.");
  }
}, []); 
  console.log("Sending emp_id", employeeId);
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeId) {
      alert(" Cannot apply for leave: employee ID missing.");
      return;
    }

    const newLeave = {
      user_id: employeeId,  
      from_date: formData.from_date,
      to_date: formData.to_date,
      leave_type: formData.leave_type,
      description: formData.description
    };

    console.log(" Submitting leave:", newLeave); 

    try {
      const res = await axios.post('http://localhost:5000/api/leaves', newLeave);
      alert(res.data.message);
      setFormData({ from_date: '', to_date: '', leave_type: '', description: '' });
    } catch (error) {
      console.error(' Error applying leave:', error.response?.data || error.message);
      alert(' Failed to apply for leave. Please check the server.');
    }
  };


  return (
    <Box p={3}>
      <Typography variant="h6">Apply for Leave</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField type="date" name="from_date" label="From Date" fullWidth InputLabelProps={{ shrink: true }} value={formData.from_date} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField type="date" name="to_date" label="To Date" fullWidth InputLabelProps={{ shrink: true }} value={formData.to_date} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField select name="leave_type" label="Leave Type" fullWidth value={formData.leave_type} onChange={handleChange} required>
              <MenuItem value="Casual">Casual</MenuItem>
              <MenuItem value="Medical">Medical</MenuItem>
              <MenuItem value="SL">SL</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField name="description" label="Description" fullWidth multiline rows={3} value={formData.description} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">Apply</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}





