// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Grid, TextField, Paper } from '@mui/material';

// export default function MyProfile() {
//   const [employee, setEmployee] = useState({
//     code: '', firstName: '', lastName: '', email: '', gender: '', birthDate: '',
//     department: '', country: '', city: '', address: '', mobile: ''
//   });

//   useEffect(() => {
//     const storedEmployee = JSON.parse(localStorage.getItem('employee'));
//     if (!storedEmployee || !storedEmployee.email) return;

//     const fetchEmployee = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/employees/email/${storedEmployee.email}`);
//         const data = await res.json();
//         if (data.success) {
//           setEmployee(data.employee);
//         }
//       } catch (error) {
//         console.error("Failed to fetch employee data", error);
//       }
//     };

//     fetchEmployee();
//   }, []);

//   const fields = [
//     { name: 'code', label: 'Employee Code' },
//     { name: 'firstName', label: 'First Name' },
//     { name: 'lastName', label: 'Last Name' },
//     { name: 'email', label: 'Email' },
//     { name: 'gender', label: 'Gender' },
//     { name: 'birthDate', label: 'Birth Date' },
//     { name: 'department', label: 'Department' },
//     { name: 'country', label: 'Country' },
//     { name: 'city', label: 'City' },
//     { name: 'address', label: 'Address' },
//     { name: 'mobile', label: 'Mobile Number' },
//   ];

//   return (
//     <Box p={4}>
//       <Paper elevation={3} sx={{ padding: 4 }}>
//         <Typography variant="h5" fontWeight="bold" mb={3}>My Profile</Typography>
//         <Grid container spacing={2}>
//           {fields.map((field, i) => (
//             <Grid item xs={12} md={4} key={i}>
//               <TextField
//                 fullWidth
//                 label={field.label}
//                 value={employee[field.name] || ''}
//                 InputProps={{ readOnly: true }}
//                 InputLabelProps={field.name === 'birthDate' ? { shrink: true } : {}}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       </Paper>
//     </Box>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Grid,
//   TextField,
//   Paper,
//   Button
// } from '@mui/material';

// const MyProfile = () => {
//   const [employee, setEmployee] = useState({
//     code: '', firstName: '', lastName: '', email: '', gender: '', birthDate: '',
//     department: '', country: '', city: '', address: '', mobile: ''
//   });
//   const [editable, setEditable] = useState(false);
//   useEffect(() => {
//     const storedEmployee = JSON.parse(localStorage.getItem('employee'));
//     if (!storedEmployee || !storedEmployee.email) return;

//     const fetchEmployee = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/employees/email/${storedEmployee.email}`);
//         const data = await res.json();
//         if (data.success) {
//           const updatedEmployee = {
//             ...data.employee,
//             code: `EMP${String(data.employee.id).padStart(3, '0')}`
//           };
//           setEmployee(updatedEmployee);
//         }
//       } catch (error) {
//         console.error("Failed to fetch employee data", error);
//       }
//     };

//     fetchEmployee();
//   }, []);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/employees/${employee.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(employee)
//       });
//       const data = await res.json();
//       if (data.success) {
//         setEditable(false);
//         alert('Profile updated successfully!');
//       } else {
//         alert('Failed to update profile');
//       }
//     } catch (error) {
//       alert('Error updating profile');
//       console.error(error);
//     }
//   };

//   return (
//     <Box p={4}>
//       <Paper elevation={3} sx={{ padding: 4 }}>
//         <Typography variant="h5" fontWeight="bold" mb={3}>My Profile</Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Employee Code"
//               name="code"
//               value={employee.code || ''}
//               fullWidth
//               InputProps={{ readOnly: true }}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Gender"
//               name="gender"
//               value={employee.gender || ''}
//               fullWidth
//               InputProps={{ readOnly: !editable }}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Birth Date"
//               name="birthDate"
//               type="date"
//               value={employee.birthDate || ''}
//               fullWidth
//               InputProps={{ readOnly: !editable }}
//               InputLabelProps={{ shrink: true }}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <TextField
//               label="First Name"
//               name="firstName"
//               value={employee.firstName || ''}
//               fullWidth
//               InputProps={{ readOnly: !editable }}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Last Name"
//               name="lastName"
//               value={employee.lastName || ''}
//               fullWidth
//               InputProps={{ readOnly: !editable }}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Department"
//               name="department"
//               value={employee.department || ''}
//               fullWidth
//               InputProps={{ readOnly: !editable }}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Country"
//               name="country"
//               value={employee.country || ''}
//               fullWidth
//               InputProps={{ readOnly: !editable }}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Email"
//               name="email"
//               value={employee.email || ''}
//               fullWidth
//               InputProps={{ readOnly: true }}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="City"
//               name="city"
//               value={employee.city || ''}
//               fullWidth
//               InputProps={{ readOnly: !editable }}
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Address"
//               name="address"
//               value={employee.address || ''}
//               fullWidth
//               InputProps={{ readOnly: !editable }}
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Mobile Number"
//               name="mobile"
//               value={employee.mobile || ''}
//               fullWidth
//               InputProps={{ readOnly: !editable }}
//               onChange={handleChange}
//             />
//           </Grid>
//         </Grid>

//         <Box display="flex" justifyContent="flex-end" mt={3}>
//           {!editable ? (
//             <Button variant="contained" onClick={() => setEditable(true)}>Edit</Button>
//           ) : (
//             <Button variant="contained" onClick={handleUpdate}>Update</Button>
//           )}
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// export default MyProfile;


import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Paper,
  Button
} from '@mui/material';

const MyProfile = () => {
  const [employee, setEmployee] = useState({
    id: '',
    code: '',
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    birthDate: '',
    department: '',
    country: '',
    city: '',
    address: '',
    mobile: ''
  });
  const [editable, setEditable] = useState(false);
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('employee'));

    if (!loggedInUser || !loggedInUser.id) {
      console.error('❌ No user found in localStorage');
      return;
    }

    console.log("✅ Logged in user:", loggedInUser);

    const fetchEmployee = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/employees/user/${loggedInUser.id}`);
        const data = await res.json();
        if (data.success) {
          console.log("✅ Employee fetched:", data.employee);
          setEmployee({
            ...data.employee,
            code: data.employee.employeeCode || `EMP${String(data.employee.id).padStart(3, '0')}`,
          });
        } else {
          console.error('❌ Employee not found');
        }
      } catch (error) {
        console.error('❌ Failed to load employee profile', error);
      }
    };

    fetchEmployee();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/employees/${employee.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
      });
      const data = await res.json();
      if (data.success) {
        setEditable(false);
        alert('✅ Profile updated successfully!');
      } else {
        alert('❌ Failed to update profile');
      }
    } catch (error) {
      alert('❌ Error updating profile');
      console.error(error);
    }
  };

  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>My Profile</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField label="Employee Code" value={employee.code} fullWidth InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Gender" name="gender" value={employee.gender} fullWidth InputProps={{ readOnly: !editable }} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Birth Date" name="birthDate" type="date" value={employee.birthDate} fullWidth InputProps={{ readOnly: !editable }} InputLabelProps={{ shrink: true }} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="First Name" name="firstName" value={employee.firstName} fullWidth InputProps={{ readOnly: !editable }} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Last Name" name="lastName" value={employee.lastName} fullWidth InputProps={{ readOnly: !editable }} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Department" name="department" value={employee.department} fullWidth InputProps={{ readOnly: !editable }} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Country" name="country" value={employee.country} fullWidth InputProps={{ readOnly: !editable }} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Email" name="email" value={employee.email} fullWidth InputProps={{ readOnly: true }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="City" name="city" value={employee.city} fullWidth InputProps={{ readOnly: !editable }} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Address" name="address" value={employee.address} fullWidth InputProps={{ readOnly: !editable }} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Mobile Number" name="mobile" value={employee.mobile} fullWidth InputProps={{ readOnly: !editable }} onChange={handleChange} />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          {!editable ? (
            <Button variant="contained" onClick={() => setEditable(true)}>Edit</Button>
          ) : (
            <Button variant="contained" onClick={handleUpdate}>Update</Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default MyProfile;
