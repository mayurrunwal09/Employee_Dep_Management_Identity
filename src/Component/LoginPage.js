import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Slices/loginSlice';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Link as MuiLink,
  Snackbar,
} from '@mui/material';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return;
    }

   
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 8 characters long, contain at least one First upper letter, one number, and one special character (@$!%*#?&)'
      );
      return;
    }

    const loginData = {
      email,
      password,
    };

    dispatch(loginUser(loginData)).then((success) => {
      if (success) {
        navigate('/home');
      }
    });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '100px',
        }}
      >
        <Typography variant="h5" component="div" mb={4}>
          Login Page
        </Typography>
        <form style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            required
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            error={!!passwordError}
            helperText={passwordError}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#4CAF50', color: 'white' }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <MuiLink component={Link} to="/register" variant="body2">
              Don't have an account? Register here
            </MuiLink>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Please fill in Email and Password fields."
      />
    </Container>
  );
};

export default LoginPage;
