// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
// import NavBar from './Navbar';
// import LoginPage from './Component/LoginPage';

// const theme = createTheme();

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Router>
//         <CssBaseline />
//         <div className="App">
//           <NavBar />
//           <Container>
//             <Routes>
//             <Route path="/" element={<LoginPage />} /> 
//           </Routes>
//           </Container>
//         </div>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;















import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline, Paper, ThemeProvider, createTheme } from '@mui/material';
import LoginPage from './Component/LoginPage';
import NavBar from './Navbar';
import RegistrationPage from './Component/RegistrationPage';

const theme = createTheme();

function App() {
  
  const isAuthenticated = localStorage.getItem('accessToken');

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <div className="App">
          {!isAuthenticated ? (
           
            <Container>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
              </Routes>
            </Container>
          ) : (
            
            <Paper  >
              <Routes>
    
              </Routes>
              <NavBar />
            </Paper>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;








