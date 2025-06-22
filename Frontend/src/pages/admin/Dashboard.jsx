


import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  AppBar,
  Box,
  Drawer,
  Card,
  CardContent,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  CssBaseline,
  Typography,
  Grid,
  Avatar,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  List,
  Collapse,
} from '@mui/material';


import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import AddDepartment from './AddDepartment';
import Manage_Department from './Manage_Departments';
import AddLeaveType from './Leavetype';
import ManageLeaveType from './Manageleavetype';
import AddEmployee from './Addemployee';
import ManageEmployee from './ManageEmployee';
import AllLeaves from './Leaves/AllLeaves';
import PendingLeaves from './Leaves/PendingLeaves';
import ApprovedLeaves from './Leaves/ApprovedLeaves';
import NotApprovedLeaves from './Leaves/NotApprovedLeaves';

const drawerWidth = 240;
const AdminDashboard = () => {
 

  const [openDept, setOpenDept] = useState(false);
  const [openLeave, setOpenLeave] = useState(false);

  const toggleDept = () => setOpenDept(!openDept);
  const toggleLeave = () => setOpenLeave(!openLeave);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  function createData(id, employeeName, leaveType, postingDate, status) {
    return { id, employeeName, leaveType, postingDate, status };
  }

  const [openEmployee, setOpenEmployee] = useState(false);

  const [selectedView, setSelectedView] = useState('dashboard');


  const toggleEmployee = () => setOpenEmployee(!openEmployee);

  // Sample data
  function createData(id, employeeName, leaveType, postingDate, status) {
    return { id, employeeName, leaveType, postingDate, status };
  }

  const rows = [
    createData(1, 'John Doe', 'Sick Leave', '2025-06-04', 'Pending'),
    createData(2, 'Jane Smith', 'Casual Leave', '2025-06-03', 'Approved'),
    createData(3, 'Alex Brown', 'Earned Leave', '2025-06-02', 'Rejected'),
  ];

  const cardStyle = {
    backgroundColor: '#f5f5f5',
    height: 160,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const [selectedPage, setSelectedPage] = useState('dashboard');

  const [openLeaveMgmt, setOpenLeaveMgmt] = useState(false);

  // Toggle Function
  const toggleLeaveMgmt = () => {
    setOpenLeaveMgmt(!openLeaveMgmt);
  };


  const [counts, setCounts] = useState({ empCount: 0, deptCount: 0, leaveTypeCount: 0 });

useEffect(() => {
  axios.get('http://localhost:5000/api/admin/dashboard/counts')
    .then(res => setCounts(res.data))
    .catch(err => console.error('Error loading dashboard metrics:', err));
}, []);

  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1300, backgroundColor: '#4caf50' }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, textAlign: 'center' }}>
            Employee Leave Management System
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: '64px',
          },
        }}
      >
        <Box sx={{ padding: 2, textAlign: 'center' }}>
          <Avatar sx={{ width: 64, height: 64, margin: '0 auto' }}>A</Avatar>
          <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
            Admin
          </Typography>
        </Box>

        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setSelectedView('dashboard')}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={toggleDept}>
              <ListItemIcon><ApartmentIcon /></ListItemIcon>
              <ListItemText primary="Department" />
              {openDept ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </ListItemButton>
          </ListItem>

          <Collapse in={openDept} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItemButton onClick={() => setSelectedView('add-department')}>
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary="Add Department" />
              </ListItemButton>
              <ListItemButton onClick={() => setSelectedView('manage-department')}>
                <ListItemIcon><ManageAccountsIcon /></ListItemIcon>
                <ListItemText primary="Manage Department" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItem disablePadding>
            <ListItemButton onClick={toggleLeave}>
              <ListItemIcon><CategoryIcon /></ListItemIcon>
              <ListItemText primary="Leave Type" />
              {openLeave ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </ListItemButton>
          </ListItem>

          <Collapse in={openLeave} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItemButton onClick={() => setSelectedView('add-leave-type')}>
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary="Add Leave Type" />
              </ListItemButton>
              <ListItemButton onClick={() => setSelectedView('manage-leave-type')}>
                <ListItemIcon><ManageAccountsIcon /></ListItemIcon>
                <ListItemText primary="Manage Leave Type" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItem disablePadding>
            <ListItemButton onClick={toggleEmployee}>
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary="Employee" />
              {openEmployee ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </ListItemButton>
          </ListItem>

          <Collapse in={openEmployee} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItemButton onClick={() => setSelectedView('add-employee')}>
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary="Add Employee" />
              </ListItemButton>
              <ListItemButton onClick={() => setSelectedView('manage-employee')}>
                <ListItemIcon><ManageAccountsIcon /></ListItemIcon>
                <ListItemText primary="Manage Employee" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItem disablePadding>
            <ListItemButton onClick={toggleLeaveMgmt}>
              <ListItemIcon><EventNoteIcon /></ListItemIcon>
              <ListItemText primary="Leave Management" />
              {openLeaveMgmt ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </ListItemButton>
          </ListItem>

          <Collapse in={openLeaveMgmt} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItemButton onClick={() => setSelectedView('all-leaves')}>
                <ListItemText primary="All Leaves" />
              </ListItemButton>
              <ListItemButton onClick={() => setSelectedView('pending-leaves')}>
                <ListItemText primary="Pending Leaves" />
              </ListItemButton>
              <ListItemButton onClick={() => setSelectedView('approved-leaves')}>
                <ListItemText primary="Approved Leaves" />
              </ListItemButton>
              <ListItemButton onClick={() => setSelectedView('not-approved-leaves')}>
                <ListItemText primary="Not Approved Leaves" />
              </ListItemButton>
            </List>
          </Collapse>

          <Divider sx={{ my: 1 }} />

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon><LockIcon /></ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Right Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 8 }}>
        {selectedView === 'dashboard' && (
          <>
            {/* Cards */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={cardStyle}>
                  <CardContent>
                    <Typography variant="h6">Total Registered Employees</Typography>
                   <Typography variant="h4" fontWeight="bold">{counts.empCount}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={cardStyle}>
                  <CardContent>
                    <Typography variant="h6">Total Departments</Typography>
                    <Typography variant="h4" fontWeight="bold">{counts.deptCount}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={cardStyle}>
                  <CardContent>
                    <Typography variant="h6">Total Leave Types</Typography>
                   <Typography variant="h4" fontWeight="bold">{counts.leaveTypeCount}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Table */}
            <Box sx={{ pt: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Latest Leave Applications
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>SI. No</TableCell>
                      <TableCell>Employee Name</TableCell>
                      <TableCell>Leave Type</TableCell>
                      <TableCell>Posting Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.employeeName}</TableCell>
                        <TableCell>{row.leaveType}</TableCell>
                        <TableCell>{row.postingDate}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>
                          <Button size="small" variant="outlined">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </>
        )}

        {selectedView === 'add-department' && <AddDepartment />}
        {selectedView === 'manage-department' && <Manage_Department />}

        {selectedView === 'add-leave-type' && <AddLeaveType />}
        {selectedView === 'manage-leave-type' && <ManageLeaveType />}

        {selectedView === 'add-employee' && <AddEmployee />}
        {selectedView === 'manage-employee' && <ManageEmployee />}


         {selectedView === 'all-leaves' && <AllLeaves />}
         {selectedView === 'pending-leaves' && <PendingLeaves />}
        {selectedView === 'approved-leaves' && <ApprovedLeaves />}
        {selectedView === 'not-approved-leaves' && <NotApprovedLeaves />} 


      </Box>
    </Box>



  );
};

export default AdminDashboard;