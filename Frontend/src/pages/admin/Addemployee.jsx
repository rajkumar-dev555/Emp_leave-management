

import React, { useState } from 'react';
import { Box, Typography, Grid, TextField, MenuItem, Button, Alert } from '@mui/material';
import axios from 'axios';

const deptList = ['HR', 'Finance', 'Engineering', 'Marketing'];
const countries = ['India', 'USA', 'UK', 'Germany'];

export default function AddEmployee({ onAdded }) {
  const [f, s] = useState({
    code: '', firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    gender: '', birthDate: '', department: '', country: '', city: '', address: '', mobile: ''
  });
  const [msg, setMsg] = useState({ type: '', text: '' });

  const change = e => s({ ...f, [e.target.name]: e.target.value });

  const onSubmit = async () => {
    if (f.password !== f.confirmPassword) {
      return setMsg({ type: 'error', text: "Passwords don't match" });
    }

    try {
      const res = await axios.post('http://localhost:5000/api/employees', f);
      if (res.data.success) {
        setMsg({ type: 'success', text: 'Employee added successfully!' });
        s({
          code: '', firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
          gender: '', birthDate: '', department: '', country: '', city: '', address: '', mobile: ''
        });
        onAdded && onAdded();
      } else {
        setMsg({ type: 'error', text: res.data.message || 'Add failed' });
      }
    } catch (e) {
      setMsg({ type: 'error', text: e.response?.data?.message || 'Server error' });
    }
  };

  const fields = [
    { name: 'code', label: 'Employee Code' },
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
    { name: 'gender', label: 'Gender', select: true, options: ['Male', 'Female', 'Other'] },
    { name: 'birthDate', label: 'Birth Date', type: 'date' },
    { name: 'department', label: 'Department', select: true, options: deptList },
    { name: 'country', label: 'Country', select: true, options: countries },
    { name: 'city', label: 'City' },
    { name: 'address', label: 'Address' },
    { name: 'mobile', label: 'Mobile Number' },
  ];

  return (
    <Box mt={5}>
      <Typography variant="h6" gutterBottom>Add New Employee</Typography>
      {msg.text && <Alert severity={msg.type} sx={{ mb: 2 }}>{msg.text}</Alert>}
      <Grid container spacing={2}>
        {fields.map((fld, i) => (
          <Grid item xs={12} md={4} key={i}>
            <TextField
              fullWidth
              select={fld.select}
              type={fld.type || 'text'}
              name={fld.name}
              label={fld.label}
              value={f[fld.name]}
              onChange={change}
              InputLabelProps={fld.type === 'date' ? { shrink: true } : {}}
            >
              {fld.options && fld.options.map(o => (
                <MenuItem key={o} value={o}>{o}</MenuItem>
              ))}
            </TextField>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={onSubmit}>Add Employee</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
