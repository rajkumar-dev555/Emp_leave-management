

import React, { useState } from 'react';
import { TextField, Button, ToggleButton, ToggleButtonGroup, Paper, Typography, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './employee/Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [roleType, setRoleType] = useState('admin');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRoleChange = (_, newRole) => {
    if (newRole) {
      setRoleType(newRole);
      formik.setFieldValue('role', newRole);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: 'admin',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        setErrorMsg('');
        const res = await axios.post('http://localhost:5000/api/login', values);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate(values.role === 'admin' ? '/admin' : '/employee');
      } catch (err) {
        const msg = err.response?.data?.message || 'Invalid credentials. Please try again.';
        setErrorMsg(msg);
      }
    },
  });
  

  return (
    <div className="loginPageWrapper">
      <div className="topBar">
        <ToggleButtonGroup
          value={roleType}
          exclusive
          onChange={handleRoleChange}
          className="roleToggle"
        >
          <ToggleButton value="admin">Admin Login</ToggleButton>
          <ToggleButton value="employee">Employee Login</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <p className="welcomeText">Welcome to ELMS</p>
      <Paper elevation={4} className="loginFormContainer">
        <Typography variant="h5" className="formTitle">
          {roleType === 'admin' ? 'Admin Login' : 'Employee Login'}
        </Typography>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        <form onSubmit={formik.handleSubmit} className="loginForm">
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth className="submitBtn">
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;


