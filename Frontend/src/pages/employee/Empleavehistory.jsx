

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
 