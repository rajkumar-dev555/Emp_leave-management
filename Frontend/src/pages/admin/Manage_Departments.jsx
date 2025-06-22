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
  Pagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import UpdateDepartment from './UpdateDepartment';

const ManageDepartment = ({ selectedView }) => {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ code: '', name: '', short_name: '' });



  const fetchDepartments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/departments');
      setDepartments(res.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/departments/${id}`);
      fetchDepartments();
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/departments/${id}`);
      setEditData(res.data);
      setEditingId(id);
    } catch (error) {
      console.error('Error loading department:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Manage Department
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

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
              <TableRow>
                <TableCell>SI. No</TableCell>
                <TableCell>Dept. Code</TableCell>
                <TableCell>Dept. Name</TableCell>
                <TableCell>Short Name</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDepartments.map((dept, index) => (
                <TableRow key={dept.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{dept.code}</TableCell>
                  <TableCell>{dept.name}</TableCell>
                  <TableCell>{dept.short_name}</TableCell> {/* <-- Fixed here */}
                  <TableCell>{new Date(dept.created_at).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleEdit(dept.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(dept.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="body2" color="text.secondary">
          Showing 1 to {filteredDepartments.length} of {filteredDepartments.length} entries
        </Typography>

        <Pagination count={1} color="primary" />
      </Box>

      {/* {selectedView === 'update-department' && <UpdateForm />} */}
      {editingId && (
        <UpdateDepartment
          editingId={editingId}
          setEditingId={setEditingId}
          fetchDepartments={fetchDepartments}
          editData={editData} // ✅ add this
          setEditData={setEditData} // ✅ add this
        />
      )}

    </Box>
  );
};

export default ManageDepartment;


{/* {selectedView === 'update-department' && <UpdateForm />} */ }
