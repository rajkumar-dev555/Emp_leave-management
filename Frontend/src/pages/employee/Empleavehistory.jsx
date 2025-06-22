// import React, { useState, useEffect } from 'react';
// import { Box, Typography, TextField, Grid, Table, TableHead, TableRow, TableCell, TableBody, Pagination, MenuItem, Select } from '@mui/material';
// import axios from 'axios';

// export default function LeaveHistory() {
//   const [leaves, setLeaves] = useState([]);
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const rows = 10; // Show 10 entries
//   const [refresh, setRefresh] = useState(false);

// //  useEffect(() => {
// //   axios.get('http://localhost:5000/api/leaves')
// //     .then(res => setLeaves(res.data.data)) // ✅ use res.data.data instead of res.data
// //     .catch(err => console.error('Failed to fetch leaves', err));
// // }, [refresh]);

// useEffect(() => {
//   const emp = JSON.parse(localStorage.getItem('employee'));
//   if (!emp?.id) return;

//   axios
//     .get(`http://localhost:5000/api/leaves?emp_id=${emp.id}`)
//     .then(res => setLeaves(res.data.data))
//     .catch(err => console.error('Failed to fetch leaves', err));
// }, [refresh]);

//   const filtered = leaves.filter(l =>
//     l.description.toLowerCase().includes(search.toLowerCase())
//   );

//   const pageCount = Math.ceil(filtered.length / rows);
//   const slice = filtered.slice((page - 1) * rows, page * rows);

//   return (
//     <Box p={4}>
//       <Typography variant="h5" fontWeight="bold" mb={2}>Leave History</Typography>

//       <Grid container justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography>Show 10 entries</Typography>
//         <TextField
//           size="small"
//           label="Search Record"
//           value={search}
//           onChange={e => { setSearch(e.target.value); setPage(1); }}
//         />
//       </Grid>

//       <Table>
//         <TableHead sx={{ backgroundColor: '#eee' }}>
//           <TableRow>
//             {['S.No', 'From Date', 'To Date', 'Description', 'Posting Date', 'Admin Remark', 'Status'].map(h => (
//               <TableCell key={h}>{h}</TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {slice.map((leave, i) => (
//             <TableRow key={leave.id}>
//               <TableCell>{(page - 1) * rows + i + 1}</TableCell>
//               <TableCell>{new Date(leave.from_date).toLocaleDateString()}</TableCell>
//               <TableCell>{new Date(leave.to_date).toLocaleDateString()}</TableCell>
//               <TableCell>{leave.description}</TableCell>
//               <TableCell>{new Date(leave.posting_date).toLocaleDateString()}</TableCell>
//               <TableCell>{leave.admin_remark || 'Waiting for Approval'}</TableCell>
//               <TableCell>{leave.status || 'Waiting for Approval'}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       <Grid container justifyContent="space-between" alignItems="center" mt={2}>
//         <Typography variant="body2">
//           Showing {(page - 1) * rows + 1} to {Math.min(page * rows, filtered.length)} of {filtered.length} entries
//         </Typography>
//         <Pagination count={pageCount} page={page} onChange={(_, v) => setPage(v)} />
//       </Grid>
//     </Box>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Typography, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';

export default function LeaveHistory() {
  const [leaves, setLeaves] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?.id) {
      axios.get(`http://localhost:5000/api/leaves/${user.id}`)
        .then(res => setLeaves(res.data.leaves))
        .catch(err => console.error('Error fetching leave history:', err));
    }
  }, [user]);

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>Leave History</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Leave Type</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Posting Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Admin Remark</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaves.map((leave, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{leave.leave_type}</TableCell>
              <TableCell>{leave.from_date}</TableCell>
              <TableCell>{leave.to_date}</TableCell>
              <TableCell>{leave.description}</TableCell>
              <TableCell>{new Date(leave.posting_date).toLocaleDateString()}</TableCell>
              <TableCell>{leave.status}</TableCell>
              <TableCell>{leave.admin_remark || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
 