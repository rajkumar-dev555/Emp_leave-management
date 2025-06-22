


import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Grid, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Pagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import AddEmployee from './Addemployee';

export default function ManageEmployee() {
  const [emps, setEmps] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const rows = 5;

  useEffect(() => {
    axios.get('http://localhost:5000/api/employees').then(res => setEmps(res.data));
  }, [refresh]);

  const del = id => axios.delete(`http://localhost:5000/api/employees/${id}`).then(() => setRefresh(r => !r));

  const filtered = emps.filter(e =>
    e.code.toLowerCase().includes(search.toLowerCase()) ||
    `${e.first_name} ${e.last_name}`.toLowerCase().includes(search.toLowerCase())
  );

  const pageCount = Math.ceil(filtered.length / rows);
  const slice = filtered.slice((page - 1) * rows, page * rows);

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={2}>Manage Employees</Typography>
      <Grid container justifyContent="flex-end" mb={2}>
        <TextField size="small" label="Search" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
      </Grid>
      <Table>
        <TableHead sx={{ backgroundColor: '#eee' }}>
          <TableRow>
            {['S.No', 'Emp Code', 'Name', 'Department', 'Status', 'Reg Date', 'Action'].map(h => <TableCell key={h}>{h}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {slice.map((e, i) => (
            <TableRow key={e.id}>
              <TableCell>{(page - 1) * rows + i + 1}</TableCell>
              <TableCell>{e.code}</TableCell>
              <TableCell>{e.first_name} {e.last_name}</TableCell>
              <TableCell>{e.department}</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>{new Date(e.created_at).toLocaleDateString()}</TableCell>
              <TableCell>
                <IconButton><EditIcon /></IconButton>
                <IconButton onClick={() => del(e.id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid container justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="body2">Showing {(page - 1) * rows + 1} to {Math.min(page * rows, filtered.length)} of {filtered.length}</Typography>
        <Pagination count={pageCount} page={page} onChange={(_, v) => setPage(v)} />
      </Grid>
      <AddEmployee onAdded={() => setRefresh(r => !r)} />
    </Box>
  );
}
