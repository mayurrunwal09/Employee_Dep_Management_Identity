// import React, { useState } from 'react';

// const SearchBySalary = () => {
//   const [minSalary, setMinSalary] = useState('');
//   const [maxSalary, setMaxSalary] = useState('');
//   const [searchResult, setSearchResult] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     try {
//       const response = await searchEmployeesBySalaryRange(minSalary, maxSalary);
//       setSearchResult(response);
//       setError(null);
//     } catch (error) {
//       console.error('Search Error:', error.message);
//       setSearchResult(null);
//       setError('Error fetching data. Please try again.');
//     }
//   };

//   const searchEmployeesBySalaryRange = async (min, max) => {
//     try {
//       const apiUrl = `https://localhost:44331/api/Condition/GetEmployeesBySalaryRange?minSalary=${min}&maxSalary=${max}`;
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
//         <table border="1">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Employee Name</th>
//             <th>Email</th>
//             <th>Phone Number</th>
//             <th>Gender</th>
//             <th>Date of Birth</th>
//             <th>Department ID</th>
//             <th>Department Name</th>
//             <th>Salary Amount</th>
//             <th>Salary Date</th>
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
//               <td>{employee.depId}</td>
//               <td>{employee.depName}</td>
//               <td>{employee.salary[0].amount}</td>
//               <td>{new Date(employee.salary[0].date).toLocaleDateString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   };

//   return (
//     <div>
//       <h2>Search Employees by Salary Range</h2>
//       <label>Min Salary:</label>
//       <input
//         type="text"
//         value={minSalary}
//         onChange={(e) => setMinSalary(e.target.value)}
//       />
//       <label>Max Salary:</label>
//       <input
//         type="text"
//         value={maxSalary}
//         onChange={(e) => setMaxSalary(e.target.value)}
//       />
//       <button type="button" onClick={handleSearch}>
//         Search
//       </button>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {searchResult && renderTable()}
//     </div>
//   );
// };

// export default SearchBySalary;













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
      setError('Error fetching data. Please try again.');
    }
  };

  const searchEmployeesBySalaryRange = async (min, max) => {
    try {
      const apiUrl = `https://localhost:44331/api/Condition/GetEmployeesBySalaryRange?minSalary=${min}&maxSalary=${max}`;
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
              <TableCell>Department ID</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Salary Amount</TableCell>
              <TableCell>Salary Date</TableCell>
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
                <TableCell>{employee.depId}</TableCell>
                <TableCell>{employee.depName}</TableCell>
                <TableCell>{employee.salary[0].amount}</TableCell>
                <TableCell>{new Date(employee.salary[0].date).toLocaleDateString()}</TableCell>
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
