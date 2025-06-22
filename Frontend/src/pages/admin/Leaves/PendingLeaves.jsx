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

// const pendingLeaves = [
//   { id: 1, empName: 'Raj Kumar', leaveType: 'Casual', date: '2025-06-01', status: 'Pending' },
//   { id: 2, empName: 'Anita Sharma', leaveType: 'Sick', date: '2025-06-03', status: 'Pending' },
//   { id: 3, empName: 'John Doe', leaveType: 'Annual', date: '2025-06-04', status: 'Pending' },
// ];

// const  PendingLeaves =() => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredLeaves = pendingLeaves.filter((leave) =>
//     leave.empName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Box p={4}>
//       {/* Title */}
//       <Typography variant="h5" fontWeight="bold" mb={2}>
//         Pending Leaves
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

// export default PendingLeaves







// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, TextField,
//   Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow,
//   Paper, Button
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const PendingLeaves = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/leaves/pending')
//       .then(res => {
//         console.log('🔍 API response:', res.data);
//         setLeaves(res.data.data || res.data);
//       })
//       .catch(err => console.error('Error fetching pending leaves:', err));
//   }, []);

//   const filtered = leaves.filter(l =>
//     l.emp_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Box p={4}>
//       <Typography variant="h5" mb={2}>Pending Leaves</Typography>
//       <Box display="flex" justifyContent="space-between" mb={2}>
//         <Typography>Show 10</Typography>
//         <TextField
//           size="small"
//           placeholder="Search records..."
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//         />
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ background: '#f0f0f0' }}>
//             <TableRow>
//               {['SI.No', 'Emp Name', 'Leave Type', 'Posting Date', 'Status', 'Action'].map(h => (
//                 <TableCell key={h}>{h}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filtered.map((leave, idx) => (
//               <TableRow key={leave.id}>
//                 <TableCell>{idx + 1}</TableCell>
//                 <TableCell>{leave.emp_name}</TableCell>
//                 <TableCell>{leave.leave_type}</TableCell>
//                 <TableCell>{new Date(leave.posting_date).toLocaleDateString()}</TableCell>
//                 <TableCell>Waiting for Approval</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     size="small"
//                     onClick={() => navigate(`/leave-details/${leave.id}`)}
//                   >
//                     View Details
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//             {filtered.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   No pending leaves found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default PendingLeaves;



// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, TextField, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Paper, Button
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const PendingLeaves = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   // ✅ Fetch ALL pending leaves without filtering by email
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/leaves/pending')
//       .then(res => setLeaves(res.data.data || []))
//       .catch(err => console.error('Error fetching pending leaves:', err));
//   }, []);

//   const filteredLeaves = leaves.filter(l =>
//     `${l.name || ''}`.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Box p={4}>
//       <Typography variant="h5" mb={2}>Pending Leaves</Typography>

//       <Box display="flex" justifyContent="space-between" mb={2}>
//         <Typography>Show {filteredLeaves.length} entries</Typography>
//         <TextField
//           size="small"
//           placeholder="Search by name..."
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//         />
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ background: '#f0f0f0' }}>
//             <TableRow>
//               {['SI.No', 'Name', 'Leave Type', 'Posting Date', 'Status', 'Action'].map(h => (
//                 <TableCell key={h}>{h}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredLeaves.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">No pending leaves found.</TableCell>
//               </TableRow>
//             ) : (
//               filteredLeaves.map((l, i) => (
//                 <TableRow key={l.id}>
//                   <TableCell>{i + 1}</TableCell>
//                   <TableCell>{l.name}</TableCell>
//                   <TableCell>{l.leave_type}</TableCell>
//                   <TableCell>{new Date(l.posting_date).toLocaleDateString()}</TableCell>
//                   <TableCell>{l.status}</TableCell>
//                   <TableCell>
//                     <Button
//                       size="small"
//                       variant="outlined"
//                       onClick={() => navigate(`/leave-details/${l.id}`)}
//                     >
//                       View Details
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default PendingLeaves;


import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Divider, Grid,
  Dialog, DialogTitle, DialogContent, DialogActions,
  MenuItem, Select, FormControl, InputLabel, TextareaAutosize
} from '@mui/material';

import axios from 'axios';

const PendingLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeave, setSelectedLeave] = useState(null);


  // poppup
  const [openDialog, setOpenDialog] = useState(false);
  // const [selectedLeave, setSelectedLeave] = useState(null);
  const [actionStatus, setActionStatus] = useState('');
  const [adminRemark, setAdminRemark] = useState('');


  const handleTakeActionClick = (leave) => {
    setSelectedLeave(leave);
    setOpenDialog(true);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/leaves/pending')
      .then(res => setLeaves(res.data.data || []))
      .catch(err => console.error('Error fetching pending leaves:', err));
  }, []);

  const filteredLeaves = leaves.filter(l =>
    `${l.name || ''}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>Pending Leaves</Typography>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography>Show {filteredLeaves.length} entries</Typography>
        <TextField
          size="small"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ background: '#f0f0f0' }}>
            <TableRow>
              {['SI.No', 'Name', 'Leave Type', 'Posting Date', 'Status', 'Action'].map(h => (
                <TableCell key={h}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeaves.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">No pending leaves found.</TableCell>
              </TableRow>
            ) : (
              filteredLeaves.map((l, i) => (
                <TableRow key={l.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{l.name}</TableCell>
                  <TableCell>{l.leave_type}</TableCell>
                  <TableCell>{new Date(l.posting_date).toLocaleDateString()}</TableCell>
                  <TableCell>{l.status}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => setSelectedLeave(l)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
          <Typography fontWeight="bold">{selectedLeave.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">Email</Typography>
          <Typography fontWeight="bold">{selectedLeave.email || 'N/A'}</Typography>
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
          <Typography variant="body2" color="textSecondary">From Date</Typography>
          <Typography fontWeight="bold">{selectedLeave.from_date}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">To Date</Typography>
          <Typography fontWeight="bold">{selectedLeave.to_date}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">Description</Typography>
          <Typography fontWeight="bold">{selectedLeave.description}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">Status</Typography>
          <Typography fontWeight="bold" color="warning.main">
            {selectedLeave.status}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">Admin Remark</Typography>
          <Typography fontWeight="bold">
            {selectedLeave.admin_remark || 'Not Yet Taken'}
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleTakeActionClick(selectedLeave)} // ✅ FIXED
          >
            Take Action
          </Button>
        </Grid>
      </Grid>
    </Box>
  </>
)}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Leave Take Action</DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={actionStatus}
              onChange={(e) => setActionStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Not Approved">Not Approved</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextareaAutosize
              minRows={4}
              placeholder="Admin Remark"
              value={adminRemark}
              onChange={(e) => setAdminRemark(e.target.value)}
              style={{ width: '100%', padding: '10px', fontSize: '1rem' }}
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={async () => {
            try {
              await axios.put(`http://localhost:5000/api/leaves/${selectedLeave.id}/status`, {
                status: actionStatus,
                admin_remark: adminRemark
              });
              alert("✅ Leave status updated.");
              setOpenDialog(false);
              window.location.reload(); // or refresh state
            } catch (err) {
              console.error("❌ Failed to update status:", err);
              alert("❌ Error updating status");
            }
          }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PendingLeaves;
