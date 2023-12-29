// import React, { useState } from 'react';

// const SearchEmployee = () => {
//   const [employeeName, setEmployeeName] = useState('');
//   const [searchResult, setSearchResult] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     try {
//       const response = await searchEmployeename(employeeName);
//       setSearchResult(response);
//       setError(null);
//     } catch (error) {
//       console.error('Search Error:', error.message);
//       setSearchResult(null);
//       setError('Error fetching data. Please try again.');
//     }
//   };

//   const searchEmployeename = async (empname) => {
//     try {
//       const apiUrl = `https://localhost:44331/api/Condition/GetEmployeesByName?employeeName=${empname}`;
//       const response = await fetch(apiUrl);

//       if (!response.ok) {
//         throw new Error(`API Error: ${response.status} - ${response.statusText}`);
//       }

//       return response.json();
//     } catch (error) {
//       console.error('API Error:', error);
//       throw error;
//     }
//   };

//   const renderTable = () => {
//     if (!searchResult || searchResult.length === 0) {
//       return <p>No data found.</p>;
//     }

//     return (
//       <table border="1">
//         <thead >
//           <tr>
//             <th>ID</th>
//             <th>Employee Name</th>
//             <th>Email</th>
//             <th>Phone Number</th>
//             <th>Gender</th>
//             <th>Date of Birth</th>
          
//             <th>Department Name</th>
//             <th>Salary Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {searchResult.map((employee) => (
//             <tr key={employee.id}>
//               <td>{employee.id}</td>
//               <td>{employee.empName}</td>
//               <td>{employee.email}</td>
//               <td>{employee.phoneno}</td>
//               <td>{employee.gender}</td>
//               <td>{new Date(employee.dob).toLocaleDateString()}</td>
           
//               <td>{employee.depName}</td>
//               <td>{employee.salaryAmount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   };

//   return (
//     <div>
//       <h2>Search Employee</h2>
//       <label>Employee Name:</label>
//       <input
//         type="text"
//         value={employeeName}
//         onChange={(e) => setEmployeeName(e.target.value)}
//       />
//       <button type="button" onClick={handleSearch}>
//         Search
//       </button>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {searchResult && renderTable()}
//     </div>
//   );
// };

// export default SearchEmployee;







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

const SearchEmployee = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await searchEmployeename(employeeName);
      setSearchResult(response);
      setError(null);
    } catch (error) {
      console.error('Search Error:', error.message);
      setSearchResult(null);
      setError('Error fetching data. Please try again.');
    }
  };

  const searchEmployeename = async (empname) => {
    try {
      const apiUrl = `https://localhost:44331/api/Condition/GetEmployeesByName?employeeName=${empname}`;
      const response = await fetch(apiUrl);

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
      <Typography variant="h2" sx={{ marginBottom: 2 }}>
        Search Employee
      </Typography>
      <TextField
        label="Employee Name"
        type="text"
        value={employeeName}
        onChange={(e) => setEmployeeName(e.target.value)}
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

export default SearchEmployee;
