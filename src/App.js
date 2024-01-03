import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import NavBar from './Navbar';
import LoginPage from './Component/LoginPage';

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
            <Route path="/" element={<LoginPage />} /> 
          </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;



