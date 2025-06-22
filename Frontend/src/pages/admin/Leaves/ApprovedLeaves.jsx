// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Pagination,
// } from '@mui/material';

// const approvedLeaves = [
//   { id: 1, empName: 'Raj Kumar', leaveType: 'Casual', date: '2025-05-21', status: 'Approved' },
//   { id: 2, empName: 'Anita Sharma', leaveType: 'Sick', date: '2025-05-15', status: 'Approved' },
//   { id: 3, empName: 'John Doe', leaveType: 'Annual', date: '2025-05-10', status: 'Approved' },
// ];

// const  ApprovedLeaves = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredLeaves = approvedLeaves.filter((leave) =>
//     leave.empName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Box p={4}>
//       {/* Title */}
//       <Typography variant="h5" fontWeight="bold" mb={2}>
//         Approved Leaves History
//       </Typography>

//       {/* Top Controls */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="body1">Show 10</Typography>
//         <TextField
//           size="small"
//           placeholder="Search records..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </Box>

//       {/* Table */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
//             <TableRow>
//               <TableCell>SI. No</TableCell>
//               <TableCell>Emp Name</TableCell>
//               <TableCell>Leave Type</TableCell>
//               <TableCell>Posting Date</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredLeaves.map((leave, index) => (
//               <TableRow key={leave.id}>
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell>{leave.empName}</TableCell>
//                 <TableCell>{leave.leaveType}</TableCell>
//                 <TableCell>{leave.date}</TableCell>
//                 <TableCell>{leave.status}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" size="small">
//                     View Details
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Footer */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
//         <Typography variant="body2" color="text.secondary">
//           Showing 1 to {filteredLeaves.length} of {filteredLeaves.length} entries
//         </Typography>
//         <Pagination count={1} color="primary" />
//       </Box>
//     </Box>
//   );
// }

// export default ApprovedLeaves;


import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Button, Pagination,Grid,Divider
} from '@mui/material';
import axios from 'axios';

const ApprovedLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeave, setSelectedLeave] = useState(null);


  useEffect(() => {
    axios.get('http://localhost:5000/api/leaves/status/approved')
      .then(res => setLeaves(res.data.data || []))
      .catch(err => console.error('Error fetching approved leaves:', err));
  }, []);

  const filteredLeaves = leaves.filter((leave) =>
    leave.empName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={2}>Approved Leaves History</Typography>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography>Show {filteredLeaves.length}</Typography>
        <TextField size="small" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              {['SI.No', 'Emp Name', 'Leave Type', 'Posting Date', 'Status', 'Action'].map(h => (
                <TableCell key={h}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeaves.length === 0 ? (
              <TableRow><TableCell colSpan={6} align="center">No Approved Leaves Found</TableCell></TableRow>
            ) : (
              filteredLeaves.map((leave, i) => (
                <TableRow key={leave.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{leave.empName}</TableCell>
                  <TableCell>{leave.leave_type}</TableCell>
                  <TableCell>{new Date(leave.posting_date).toLocaleDateString()}</TableCell>
                  <TableCell>{leave.status}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => setSelectedLeave(leave)} // ✅ Set selected leave
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Typography variant="body2">Showing {filteredLeaves.length} entries</Typography>
        <Pagination count={1} />
      </Box>
      {selectedLeave && (
  <>
    <Divider sx={{ my: 3 }} />
    <Typography variant="h6" mb={2} color="primary">Leave Details</Typography>

    <Box
      component={Paper}
      elevation={3}
      p={3}
      borderRadius={2}
      sx={{ backgroundColor: '#f9f9f9', maxWidth: 700 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">Name</Typography>
          <Typography fontWeight="bold">{selectedLeave.empName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">Leave Type</Typography>
          <Typography fontWeight="bold">{selectedLeave.leave_type}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">Posting Date</Typography>
          <Typography fontWeight="bold">
            {new Date(selectedLeave.posting_date).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">Status</Typography>
          <Typography fontWeight="bold" color={selectedLeave.status === 'Approved' ? 'success.main' : 'error.main'}>
            {selectedLeave.status}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">Admin Remark</Typography>
          <Typography fontWeight="bold">
            {selectedLeave.admin_remark || 'Not Yet Provided'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </>
)}
    </Box>
  );
};

export default ApprovedLeaves;
