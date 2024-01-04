import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Home from './Home';
import Department from './Component/Department';
import Employee from './Component/Employee';
import Salary from './Component/Salary';
import Search from './Component/Search';
import LoginPage from './Component/LoginPage';
import RegistrationPage from './Component/RegistrationPage';
import SearchSalary from './Component/SearchSalary';
import SearchYear from './Component/SearchYear';
import { Logout } from './Component/Logout';
import { useAuth } from './Component/authContext';

const NavBar = () => {
  const  authToken  = localStorage.getItem('accessToken');

  return (
    <>
      <AppBar position="static">
        <Toolbar >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
            
          </Typography>
          {authToken ? (
            <>
              <Button color="inherit" component={Link} to="/home">
               Home
              </Button>
              <Button color="inherit" component={Link} to="/departments">
                Departments
              </Button>
              <Button color="inherit" component={Link} to="/employee">
                Employee
              </Button>
              <Button color="inherit" component={Link} to="/salary">
                Salary
              </Button>
              <Button color="inherit" component={Link} to="/searchsalary">
                SearchBySalary
              </Button>
              <Button color="inherit" component={Link} to="/searchyear">
                SearchByYear
              </Button>
              <Button color="inherit" component={Link} to="/search">
                Search Employee
              </Button>
              <Button color="inherit" component={Link} to="/logout">
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/logout">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/departments" element={<Department />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/salary" element={<Salary />} />
        <Route path="/search" element={<Search />} />
        <Route path="/searchsalary" element={<SearchSalary />} />
        <Route path="/searchyear" element={<SearchYear />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

export default NavBar;






