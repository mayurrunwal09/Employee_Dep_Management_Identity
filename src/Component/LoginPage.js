





// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../Slices/loginSlice';
// import { Link } from 'react-router-dom';
// import { Container, Typography, TextField, Button, Paper, Grid, Link as MuiLink } from '@mui/material';

// const LoginPage = () => {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     const loginData = {
//       email,
//       password,
//     };

//     dispatch(loginUser(loginData));
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Typography variant="h5" component="div" mb={4}>
//           Login Page
//         </Typography>
//         <form style={{ width: '100%' }}>
//           <TextField
//             label="Email"
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             label="Password"
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button
//             type="button"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2, backgroundColor: '#4CAF50', color: 'white' }}
//             onClick={handleLogin}
//           >
//             Login
//           </Button>
//         </form>
//         <Grid container justifyContent="flex-end">
//           <Grid item>
//             <MuiLink component={Link} to="/register" variant="body2">
//               Don't have an account? Register here
//             </MuiLink>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Container>
//   );
// };

// export default LoginPage;









import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Slices/loginSlice';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Link as MuiLink,
} from '@mui/material';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const loginData = {
      email,
      password,
    };

    dispatch(loginUser(loginData));
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
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
    </Container>
  );
};

export default LoginPage;
