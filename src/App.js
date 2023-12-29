// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
// import Navbar from './Navbar';
// import Home from './Home';
// import Department from './Component/Department';
// import Employee from './Component/Employee';
// import Salary from './Component/Salary';
// import Search from './Component/Search';
// import LoginPage from './Component/LoginPage';
// import RegistrationPage from './Component/RegistrationPage';
// import SearchSalary from './Component/SearchSalary';
// import SearchYear from './Component/SearchYear';
// const theme = createTheme();

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Router>
//         <CssBaseline />
//         <div className="App">
//           <Navbar />
//           <Container>
//             <Routes>
//               <Route path="/" element={<LoginPage />} /> 
//               <Route path="/home" element={<Home />} />
//               <Route path="/departments" element={<Department />} />
//               <Route path="/employee" element={<Employee />} />
//               <Route path="/salary" element={<Salary />} />
//               <Route path="/search" element={<Search />} />
//               <Route path="/searchsalary" element={<SearchSalary />} />
//               <Route path="/searchyear" element={<SearchYear />} />
//               <Route path="/register" element={<RegistrationPage />} />
//             </Routes>
//           </Container>
//         </div>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;







// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import NavBar from './Navbar';


const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <div className="App">
          <NavBar />
          <Container>
            <Routes>
           
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;













