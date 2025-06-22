import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import EmployeeDashboard from './pages/employee/Dashboard';
import Departments from './pages/admin/Manage_Departments';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/employee' element={<EmployeeDashboard />} />
        <Route path='/admin/departments' element={<Departments />} />
      </Routes>
    </Router>
  );
}

export default App;