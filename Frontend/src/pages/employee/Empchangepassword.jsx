import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    const storedEmployee = JSON.parse(localStorage.getItem('employee'));
    const email = storedEmployee?.email;

    if (!email) {
      alert("Login required");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/employees/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          oldPassword: form.oldPassword,
          newPassword: form.newPassword
        })
      });

      const data = await res.json();
      if (data.success) {
        alert("Password changed successfully.");
        setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        alert(data.message || "Password change failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating password.");
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Change Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter Old Password"
            type="password"
            name="oldPassword"
            fullWidth
            margin="normal"
            value={form.oldPassword}
            onChange={handleChange}
            required
          />
          <TextField
            label="Enter New Password"
            type="password"
            name="newPassword"
            fullWidth
            margin="normal"
            value={form.newPassword}
            onChange={handleChange}
            required
          />
          <TextField
            label="Enter Confirm Password"
            type="password"
            name="confirmPassword"
            fullWidth
            margin="normal"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Change Password
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ChangePassword;
