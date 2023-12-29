// import React, { useState } from 'react';

// const DepartmentWiseMonthlySalary = () => {
//   const [year, setYear] = useState('');
//   const [searchResult, setSearchResult] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     try {
//       const response = await getDepartmentWiseMonthlySalary(year);
//       setSearchResult(response);
//       setError(null);
//     } catch (error) {
//       console.error('Search Error:', error.message);
//       setSearchResult(null);
//       setError('Error fetching data. Please try again.');
//     }
//   };

//   const getDepartmentWiseMonthlySalary = async (selectedYear) => {
//     try {
//       const apiUrl = `https://localhost:44331/api/Condition/GetDepartmentWiseMonthlySalary?year=${selectedYear}`;
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
//       <table>
//         <thead>
//           <tr>
//             <th>Department ID</th>
//             <th>Department Name</th>
//             <th>Month</th>
//             <th>Total Salary</th>
//           </tr>
//         </thead>
//         <tbody>
//           {searchResult.map((department) => (
//             <tr key={department.departmentId}>
//               <td>{department.departmentId}</td>
//               <td>{department.departmentName}</td>
//               <td>{department.month}</td>
//               <td>{department.totalSalary}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   };

//   return (
//     <div>
//       <h2>Department Wise Monthly Salary</h2>
//       <label>Year:</label>
//       <input
//         type="text"
//         value={year}
//         onChange={(e) => setYear(e.target.value)}
//       />
//       <button type="button" onClick={handleSearch}>
//         Search
//       </button>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {searchResult && renderTable()}
//     </div>
//   );
// };

// export default DepartmentWiseMonthlySalary;








import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';

const DepartmentWiseMonthlySalary = () => {
  const [year, setYear] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await getDepartmentWiseMonthlySalary(year);
      setSearchResult(response);
      setError(null);
    } catch (error) {
      console.error('Search Error:', error.message);
      setSearchResult(null);
      setError('Error fetching data. Please try again.');
    }
  };

  const getDepartmentWiseMonthlySalary = async (selectedYear) => {
    try {
      const apiUrl = `https://localhost:44331/api/Condition/GetDepartmentWiseMonthlySalary?year=${selectedYear}`;
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
      return <p>No data found.</p>;
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Department ID</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>Total Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResult.map((department) => (
              <TableRow key={department.departmentId}>
                <TableCell>{department.departmentId}</TableCell>
                <TableCell>{department.departmentName}</TableCell>
                <TableCell>{department.month}</TableCell>
                <TableCell>{department.totalSalary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div>
      <h2>Department Wise Monthly Salary</h2>
      <TextField
        label="Year"
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        sx={{ marginRight: 1 }}
      />
      <Button variant="contained" onClick={handleSearch} sx={{ marginTop: 1 }}>
        Search
      </Button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {searchResult && renderTable()}
    </div>
  );
};

export default DepartmentWiseMonthlySalary;





