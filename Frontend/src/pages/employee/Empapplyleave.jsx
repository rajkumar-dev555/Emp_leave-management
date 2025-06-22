// import React, { useState } from 'react';
// import { Box, Typography, TextField, Grid, MenuItem, Button } from '@mui/material';
// import axios from 'axios';

// export default function Empapplyleave() {


//   const [formData, setFormData] = useState({
//     from_date: '',
//     to_date: '',
//     leave_type: '',
//     description: ''
//   });

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   const newLeave = {
//     from_date: formData.from_date,
//     to_date: formData.to_date,
//     leave_type: formData.leave_type,
//     description: formData.description
//   };

//  try {
//   await axios.post('http://localhost:5000/api/leaves', newLeave);
//   alert('✅ Leave applied successfully!');
//   setFormData({ from_date: '', to_date: '', leave_type: '', description: '' });

//   // Remove or comment this block ↓ if not used
//   // if (typeof onLeaveApplied === 'function') {
//   //   onLeaveApplied(); // Refresh table
//   // }

// } catch (error) {
//   console.error('Error:', error.response?.data || error.message);
//   alert('❌ Failed to apply for leave. Please check the server.');
// }
// };

//   return (
//     <Box p={3} mt={4} sx={{ border: '1px solid #ccc', borderRadius: '8px' }}>
//       <Typography variant="h6" mb={2}>Apply for Leave</Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="From Date"
//               type="date"
//               fullWidth
//               name="from_date"
//               InputLabelProps={{ shrink: true }}
//               value={formData.from_date}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="To Date"
//               type="date"
//               fullWidth
//               name="to_date"
//               InputLabelProps={{ shrink: true }}
//               value={formData.to_date}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Leave Type"
//               select
//               fullWidth
//               name="leave_type"
//               value={formData.leave_type}
//               onChange={handleChange}
//               required
//             >
//               <MenuItem value="Casual">Casual</MenuItem>
//               <MenuItem value="Medical">Medical</MenuItem>
//               <MenuItem value="SL">SL</MenuItem>
//             </TextField>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Description"
//               name="description"
//               fullWidth
//               multiline
//               rows={3}
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary">Apply</Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Box>
//   );
// }





// this  

// import React, { useState, useEffect } from 'react';
// import { Box, Typography, TextField, Grid, MenuItem, Button } from '@mui/material';
// import axios from 'axios';

// export default function Empapplyleave() {
//   const [formData, setFormData] = useState({
//     from_date: '',
//     to_date: '',
//     leave_type: '',
//     description: ''
//   });

//   const [empId, setEmpId] = useState(null);

//   useEffect(() => {
//     const storedEmployee = JSON.parse(localStorage.getItem('employee'));
//     if (storedEmployee && storedEmployee.id) {
//       setEmpId(storedEmployee.id); // ✅ get emp_id from localStorage
//     } else {
//       alert('❌ You are not logged in. Please log in again.');

//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newLeave = {
//        // ✅ add emp_id to payload
//       from_date: formData.from_date,
//       to_date: formData.to_date,
//       leave_type: formData.leave_type,
//       description: formData.description,
//       posting_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
//       admin_remark: 'Waiting for Approval',
//       status: 'Waiting for Approval'
//     };

//     try {
//       await axios.post('http://localhost:5000/api/leaves', newLeave);
//       alert('✅ Leave applied successfully!');
//       setFormData({ from_date: '', to_date: '', leave_type: '', description: '' });
//     } catch (error) {
//       console.error('Error:', error.response?.data || error.message);
//       alert('❌ Failed to apply for leave. Please check the server.');
//     }
//   };

//   return (
//     <Box p={3} mt={4} sx={{ border: '1px solid #ccc', borderRadius: '8px' }}>
//       <Typography variant="h6" mb={2}>Apply for Leave</Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="From Date"
//               type="date"
//               fullWidth
//               name="from_date"
//               InputLabelProps={{ shrink: true }}
//               value={formData.from_date}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="To Date"
//               type="date"
//               fullWidth
//               name="to_date"
//               InputLabelProps={{ shrink: true }}
//               value={formData.to_date}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Leave Type"
//               select
//               fullWidth
//               name="leave_type"
//               value={formData.leave_type}
//               onChange={handleChange}
//               required
//             >
//               <MenuItem value="Casual">Casual</MenuItem>
//               <MenuItem value="Medical">Medical</MenuItem>
//               <MenuItem value="SL">SL</MenuItem>
//             </TextField>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Description"
//               name="description"
//               fullWidth
//               multiline
//               rows={3}
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary">Apply</Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Box>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { Box, Typography, TextField, Grid, MenuItem, Button } from '@mui/material';
// import axios from 'axios';

// export default function Empapplyleave() {
//     const [employeeId, setEmployeeId] = useState(null); // 👈 State for emp_id
//   const [formData, setFormData] = useState({
//     from_date: '',
//     to_date: '',
//     leave_type: '',
//     description: ''
//   });
//   // const [employeeId, setEmployeeId] = useState(null);

// useEffect(() => {
//   const storedEmp = JSON.parse(localStorage.getItem('user'));
//   if (storedEmp && storedEmp.id) {
//     setEmployeeId(storedEmp.id);
//   } else {
//     alert("❌ Employee not found. Please login again.");
//   }
// }, []);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };


// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!employeeId) {
//     alert("❌ Cannot apply for leave: employee ID missing.");
//     return;
//   }

//   const newLeave = {
//     emp_id: employeeId,
//     from_date: formData.from_date,
//     to_date: formData.to_date,
//     leave_type: formData.leave_type,
//     description: formData.description
//   };

//   try {
//     const res = await axios.post('http://localhost:5000/api/leaves', newLeave);
//     alert(res.data.message);
//     setFormData({ from_date: '', to_date: '', leave_type: '', description: '' });
//   } catch (error) {
//     console.error('❌ Error applying leave:', error.response?.data || error.message);
//     alert('❌ Failed to apply for leave. Please check the server.');
//   }
// };



//   return (
//     <Box p={3}>
//       <Typography variant="h6">Apply for Leave</Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={6}>
//             <TextField type="date" name="from_date" label="From Date" fullWidth InputLabelProps={{ shrink: true }} value={formData.from_date} onChange={handleChange} required />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField type="date" name="to_date" label="To Date" fullWidth InputLabelProps={{ shrink: true }} value={formData.to_date} onChange={handleChange} required />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField select name="leave_type" label="Leave Type" fullWidth value={formData.leave_type} onChange={handleChange} required>
//               <MenuItem value="Casual">Casual</MenuItem>
//               <MenuItem value="Medical">Medical</MenuItem>
//               <MenuItem value="SL">SL</MenuItem>
//             </TextField>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField name="description" label="Description" fullWidth multiline rows={3} value={formData.description} onChange={handleChange} required />
//           </Grid>
//           <Grid item xs={12}>
//             <Button variant="contained" type="submit">Apply</Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Box>
//   );
// }





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

  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem('user'));
  //   if (storedUser && storedUser.id) {
  //     setEmployeeId(storedUser.id); // actually userId now
  //   } else {
  //     alert("❌ User not found. Please login again.");
  //   }
  // });
useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser && storedUser.id) {
    setEmployeeId(storedUser.id);
  } else {
    alert("❌ User not found. Please login again.");
  }
}, []); 
  console.log("Sending emp_id", employeeId);
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeId) {
      alert("❌ Cannot apply for leave: employee ID missing.");
      return;
    }

    const newLeave = {
      user_id: employeeId,  // ✅ use user_id to match backend + DB
      from_date: formData.from_date,
      to_date: formData.to_date,
      leave_type: formData.leave_type,
      description: formData.description
    };

    console.log("🧪 Submitting leave:", newLeave); // DEBUG LOG

    try {
      const res = await axios.post('http://localhost:5000/api/leaves', newLeave);
      alert(res.data.message);
      setFormData({ from_date: '', to_date: '', leave_type: '', description: '' });
    } catch (error) {
      console.error('❌ Error applying leave:', error.response?.data || error.message);
      alert('❌ Failed to apply for leave. Please check the server.');
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





