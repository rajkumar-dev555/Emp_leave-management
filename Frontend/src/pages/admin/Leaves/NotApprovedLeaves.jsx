import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  Grid,Divider
} from '@mui/material';

const notApprovedLeaves = [
  { id: 1, empName: 'Raj Kumar', leaveType: 'Casual', date: '2025-05-05', status: 'Not Approved' },
  { id: 2, empName: 'Anita Sharma', leaveType: 'Sick', date: '2025-05-02', status: 'Not Approved' },
  { id: 3, empName: 'John Doe', leaveType: 'Annual', date: '2025-04-29', status: 'Not Approved' },
];

const NotApprovedLeaves = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeave, setSelectedLeave] = useState(null);


  const filteredLeaves = notApprovedLeaves.filter((leave) =>
    leave.empName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={4}>
      {/* Title */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Not Approved Leaves History
      </Typography>

      {/* Top Controls */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="body1">Show 10</Typography>
        <TextField
          size="small"
          placeholder="Search records..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell>SI. No</TableCell>
              <TableCell>Emp Name</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Posting Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeaves.map((leave, index) => (
              <TableRow key={leave.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{leave.empName}</TableCell>
                <TableCell>{leave.leaveType}</TableCell>
                <TableCell>{leave.date}</TableCell>
                <TableCell>{leave.status}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSelectedLeave(leave)} // Set leave to view
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="body2" color="text.secondary">
          Showing 1 to {filteredLeaves.length} of {filteredLeaves.length} entries
        </Typography>
        <Pagination count={1} color="primary" />
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
                <Typography fontWeight="bold">{selectedLeave.leaveType}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">Posting Date</Typography>
                <Typography fontWeight="bold">{selectedLeave.date}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">Status</Typography>
                <Typography fontWeight="bold" color="error.main">
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
}

export default NotApprovedLeaves;