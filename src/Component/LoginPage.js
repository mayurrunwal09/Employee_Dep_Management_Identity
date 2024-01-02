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

  const handleLogin = () => {
    if (!email || !password) {
      setOpenSnackbar(true);
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
        message="Please fill in  Email and Password fields."
      />
    </Container>
  );
};

export default LoginPage;
