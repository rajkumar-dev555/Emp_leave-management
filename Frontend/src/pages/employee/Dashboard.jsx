// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   AppBar,
//   Box,
//   Drawer,
//   Toolbar,
//   CssBaseline,
//   Typography,
//   Avatar,
//   Divider,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
// } from '@mui/material';

// import PersonIcon from '@mui/icons-material/Person';
// import LockIcon from '@mui/icons-material/Lock';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import LogoutIcon from '@mui/icons-material/Logout';
// import ChangePassword from '../employee/Empchangepassword'; // Create this component if not present

// const drawerWidth = 240;

// const EmployeeDashboard = () => {
//   const [employee, setEmployee] = useState({ name: '', code: '' });
//   const [selectedView, setSelectedView] = useState('change-password');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const empData = JSON.parse(localStorage.getItem('employee'));
//     if (empData) {
//       setEmployee(empData);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('employee');
//     navigate('/login');
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />

//       <AppBar position="fixed" sx={{ zIndex: 1300, backgroundColor: '#4caf50' }}>
//         <Toolbar>
//           <Typography variant="h6" noWrap sx={{ flexGrow: 1, textAlign: 'center' }}>
//             Employee Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//             marginTop: '64px',
//           },
//         }}
//       >
//         <Box sx={{ padding: 2, textAlign: 'center' }}>
//           <Avatar sx={{ width: 64, height: 64, margin: '0 auto' }}>{employee.name.charAt(0)}</Avatar>
//           <Typography variant="subtitle1" sx={{ marginTop: 1 }}>{employee.name}</Typography>
//           <Typography variant="body2" color="textSecondary">{employee.code}</Typography>
//         </Box>

//         <Divider />

//         <List>
//           <ListItem disablePadding>
//             <ListItemButton onClick={() => setSelectedView('profile')}>
//               <ListItemIcon><PersonIcon /></ListItemIcon>
//               <ListItemText primary="My Profile" />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding>
//             <ListItemButton onClick={() => setSelectedView('change-password')}>
//               <ListItemIcon><LockIcon /></ListItemIcon>
//               <ListItemText primary="Change Password" />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding>
//             <ListItemButton onClick={() => setSelectedView('leaves')}>
//               <ListItemIcon><EventNoteIcon /></ListItemIcon>
//               <ListItemText primary="Leaves" />
//             </ListItemButton>
//           </ListItem>

//           <Divider sx={{ my: 1 }} />

//           <ListItem disablePadding>
//             <ListItemButton onClick={handleLogout}>
//               <ListItemIcon><LogoutIcon /></ListItemIcon>
//               <ListItemText primary="Logout" />
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 8 }}> 
//         {selectedView === 'change-password' && <ChangePassword />}
//         {/* Add other view components as needed */}
//        </Box> 
//     </Box>
//   );
// };

// export default EmployeeDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  Toolbar,
  CssBaseline,
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LogoutIcon from '@mui/icons-material/Logout';
import ChangePassword from '../employee/Empchangepassword';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Collapse from '@mui/material/Collapse';
import ApplyLeave from './Empapplyleave';
import LeaveHistory from './Empleavehistory';
import MyProfile from './Empmyprofiles';


const drawerWidth = 240;

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState({ name: '', code: '' });
  const [selectedView, setSelectedView] = useState('change-password');
  const navigate = useNavigate();

  const [openLeaves, setOpenLeaves] = useState(false);
  const toggleLeaves = () => setOpenLeaves(prev => !prev);

useEffect(() => {
  const timer = setTimeout(() => {
    try {
      const empData = JSON.parse(localStorage.getItem('user'));
      console.log("✅ LocalStorage Data:", empData);

      if (empData && empData.name && empData.id) {
        const firstName = empData.name.trim().split(' ')[0];
        const empCode = `EMP${String(empData.id).padStart(3, '0')}`;
        setEmployee({
          name: firstName,
          code: empCode,
        });
      } else {
        console.warn("⚠️ Missing employee fields in localStorage");
      }
    } catch (error) {
      console.error("❌ Invalid employee data in localStorage", error);
    }
  }, 5000); // Delay for 5 seconds

  return () => clearTimeout(timer);
}, []);



  

  const handleLogout = () => {
    localStorage.removeItem('employee');
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: 1300, backgroundColor: '#4caf50' }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, textAlign: 'center' }}>
            Employee Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

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
  <Avatar sx={{ width: 64, height: 64, margin: '0 auto' }}>
    {employee.name ? employee.name.charAt(0).toUpperCase() : 'U'}
  </Avatar>
  <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
    {employee.name || 'Unknown'}
  </Typography>
  <Typography variant="body2" color="textSecondary">
    {employee.code || 'EMP-000'}
  </Typography>
</Box>

        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setSelectedView('profile')}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setSelectedView('change-password')}>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItemButton>
          </ListItem>

          {/* <ListItem disablePadding>
            <ListItemButton onClick={() => setSelectedView('leaves')}>
              <ListItemIcon>
                <EventNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Leaves" />
            </ListItemButton>
          </ListItem> */}
          <ListItem disablePadding>
            <ListItemButton onClick={toggleLeaves}>
              <ListItemIcon><EventNoteIcon /></ListItemIcon>
              <ListItemText primary="Leaves" />
              {openLeaves ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </ListItemButton>
          </ListItem>

          <Collapse in={openLeaves} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItemButton onClick={() => setSelectedView('add-leave')}>
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary="Add Leave" />
              </ListItemButton>
              <ListItemButton onClick={() => setSelectedView('leave-history')}>
                <ListItemIcon><HistoryIcon /></ListItemIcon>
                <ListItemText primary="Leave History" />
              </ListItemButton>
            </List>
          </Collapse>

          <Divider sx={{ my: 1 }} />

          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 8 }}>
        {selectedView === 'change-password' && <ChangePassword />}
        {selectedView === 'add-leave' && <ApplyLeave />}
        {selectedView === 'leave-history' && <LeaveHistory />}
        {selectedView === 'profile' && <MyProfile />}


      </Box>
    </Box>
  );
};

export default EmployeeDashboard;




