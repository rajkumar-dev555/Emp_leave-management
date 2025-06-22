

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Pagination,
} from '@mui/material';
import axios from 'axios';

const AllLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/leaves/all')
      .then((res) => setLeaves(res.data.data || []))
      .catch((err) => console.error('❌ Error fetching all leaves:', err));
  }, []);


  const filteredLeaves = leaves
  .filter((leave) =>
    leave.empName?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter((leave) => leave.status !== 'Waiting');

  return (
    <Box p={4}>
      
      <Typography variant="h5" fontWeight="bold" mb={2}>
        All Leaves History
      </Typography>

      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="body1">Show {filteredLeaves.length} entries</Typography>
        <TextField
          size="small"
          placeholder="Search employee name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

    
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell>SI. No</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Posting Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Admin Remark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeaves.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No leave records found.
                </TableCell>
              </TableRow>
            ) : (
              filteredLeaves.map((leave, index) => (
                <TableRow key={leave.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{leave.empName}</TableCell>
                  <TableCell>{leave.leave_type}</TableCell>
                  <TableCell>{leave.from_date}</TableCell>
                  <TableCell>{leave.to_date}</TableCell>
                  <TableCell>
                    {new Date(leave.posting_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Typography
                      fontWeight="bold"
                      color={
                        leave.status === 'Approved'
                          ? 'green'
                          : leave.status === 'Not Approved'
                          ? 'red'
                          : 'orange'
                      }
                    >
                      {leave.status}
                    </Typography>
                  </TableCell>
                  <TableCell>{leave.admin_remark || '—'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredLeaves.length} of {filteredLeaves.length} entries
        </Typography>
        <Pagination count={1} color="primary" />
      </Box>
    </Box>
  );
};

export default AllLeaves;
