import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
} from '@mui/material';

const getAuthenticationToken = () => {
  const token = localStorage.getItem('accessToken');
  return token ? `Bearer ${token}` : '';
}

const SearchBySalary = () => {
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await searchEmployeesBySalaryRange(minSalary, maxSalary);
      setSearchResult(response);
      setError(null);
    } catch (error) {
      console.error('Search Error:', error.message);
      setSearchResult(null);
      setError('No data found');
    }
  };

  const searchEmployeesBySalaryRange = async (min, max) => {
    try {
      const apiUrl = `https://localhost:44331/api/Condition/GetEmployeesBySalaryRanges?minSalary=${min}&maxSalary=${max}`;
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: getAuthenticationToken(),
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const renderTable = () => {
    if (!searchResult || searchResult.length === 0) {
      return <Typography variant="body1">No data found.</Typography>;
    }

    return (
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Salary Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResult.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.empName}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phoneno}</TableCell>
                <TableCell>{employee.gender}</TableCell>
                <TableCell>{new Date(employee.dob).toLocaleDateString()}</TableCell>
                <TableCell>{employee.depName}</TableCell>
                <TableCell>{employee.salaryAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div>
      <Typography variant="h3" sx={{ marginBottom: 2 }}>
        Search Employees by Salary Range
      </Typography>
      <TextField
        label="Min Salary"
        type="text"
        value={minSalary}
        onChange={(e) => setMinSalary(e.target.value)}
        sx={{ marginRight: 1 }}
      />
      <TextField
        label="Max Salary"
        type="text"
        value={maxSalary}
        onChange={(e) => setMaxSalary(e.target.value)}
        sx={{ marginRight: 1 }}
      />
      <Button variant="contained" onClick={handleSearch} sx={{ marginTop: 1 }}>
        Search
      </Button>

      {error && <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>{error}</Typography>}

      {searchResult && renderTable()}
    </div>
  );
};

export default SearchBySalary;
