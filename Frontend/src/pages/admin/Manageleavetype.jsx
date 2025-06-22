import React, { useEffect, useState } from 'react';
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
  IconButton,
  InputAdornment,
  Pagination,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

import UpdateLeaveType from './UpdateLeavetype'; // ✅ make sure this path is correct

const ManageLeaveType = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const rowsPerPage = 5;

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', description: '' });

  const fetchLeaveTypes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/leave-types');
      setLeaveTypes(res.data);
    } catch (err) {
      console.error('Error fetching leave types:', err);
      setError('Failed to fetch leave types.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/leave-types/${id}`);
      fetchLeaveTypes();
    } catch (err) {
      console.error('Error deleting leave type:', err);
      setError('Failed to delete leave type.');
    }
  };

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const filtered = leaveTypes.filter((lt) =>
    lt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Manage Leave Type
      </Typography>

      {error && (
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1" fontWeight="medium">
          Leave Types
        </Typography>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell>SI. No</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map((lt, index) => (
              <TableRow key={lt.id}>
                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell>{lt.name}</TableCell>
                <TableCell>{lt.description}</TableCell>
                <TableCell>{new Date(lt.created_at).toLocaleDateString()}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => {
                    setEditingId(lt.id);
                    setEditData({ name: lt.name, description: lt.description });
                  }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      backgroundColor: 'white',
                      color: 'red',
                      '&:hover': { backgroundColor: '#fce8e6' },
                    }}
                    onClick={() => handleDelete(lt.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="body2" color="text.secondary">
          Showing {(page - 1) * rowsPerPage + 1} to{' '}
          {Math.min(page * rowsPerPage, filtered.length)} of {filtered.length} entries
        </Typography>
        <Pagination
          count={Math.ceil(filtered.length / rowsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>

      {/* Update Modal */}
      {editingId && (
        <UpdateLeaveType
          editingId={editingId}
          setEditingId={setEditingId}
          fetchLeaveTypes={fetchLeaveTypes}
          editData={editData}
          setEditData={setEditData}
        />
      )}
    </Box>
  );
};

export default ManageLeaveType;
