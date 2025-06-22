// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Grid, Button } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const LeaveDetails = () => {
//   const { id } = useParams();
//   const [leave, setLeave] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/leaves/${id}`)
//       .then(res => setLeave(res.data.data))
//       .catch(err => console.error('Error fetching details:', err));
//   }, [id]);

//   if (!leave) return <Typography>Loading...</Typography>;

//   return (
//     <Box p={4}>
//       <Typography variant="h5" mb={3}>Leave Details</Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={6}><b>Name:</b> {leave.first_name} {leave.last_name}</Grid>
//         <Grid item xs={6}><b>Emp Code:</b> {leave.empcode}</Grid>
//         <Grid item xs={6}><b>Gender:</b> {leave.gender}</Grid>
//         <Grid item xs={6}><b>Leave Type:</b> {leave.leave_type}</Grid>
//         <Grid item xs={6}><b>From:</b> {new Date(leave.from_date).toLocaleDateString()}</Grid>
//         <Grid item xs={6}><b>To:</b> {new Date(leave.to_date).toLocaleDateString()}</Grid>
//         <Grid item xs={6}><b>Posting Date:</b> {new Date(leave.posting_date).toLocaleDateString()}</Grid>
//         <Grid item xs={6}><b>Mobile:</b> {leave.mobile}</Grid>
//         <Grid item xs={12}><b>Description:</b> {leave.description}</Grid>
//         <Grid item xs={6}><b>Status:</b> {leave.status}</Grid>
//         <Grid item xs={6}><b>Admin Remark:</b> {leave.admin_remark || 'Waiting for Approval'}</Grid>
//         <Grid item xs={6}><b>Action Taken:</b> {leave.action_taken_date || 'Pending'}</Grid>
//       </Grid>
//       <Button variant="contained" sx={{ mt: 3 }}>Take Action</Button>
//     </Box>
//   );
// };

// export default LeaveDetails;


