
// import React, { useState } from 'react';
// import { Registration } from '../BaseURL/BaseUrl';
// import { Link } from 'react-router-dom';

// const RegistrationPage = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phoneNo, setPhoneNo] = useState('');
//   const [gender, setGender] = useState('');

//   const handleRegistration = async () => {
//     const registrationData = {
//       name,
//       email,
//       password,
//       phoneno: phoneNo,
//       gender,
//     };

//     try {
//       const response = await Registration(registrationData);
//       console.log(response);

//     } catch (error) {
//       console.error('Registration Error:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Registration Page</h2>
//       <form>
//         <label>Name:</label>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//         <br />

//         <label>Email:</label>
//         <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <br />

//         <label>Password:</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <br />

//         <label>Phone Number:</label>
//         <input type="text" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
//         <br />

//         <label>Gender:</label>
//         <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
//         <br />

//         <button type="button" onClick={handleRegistration}>
//           Register
//         </button>
//       </form>

//       <p>
//         Already have an account? <Link to="/">Login here</Link>.
//       </p>
//     </div>
//   );
// };

// export default RegistrationPage;









import React, { useState } from 'react';
import { Registration } from '../BaseURL/BaseUrl';
import { Link } from 'react-router-dom';
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  Snackbar,
} from '@mui/material';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [gender, setGender] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleRegistration = async () => {
   
    if (!name || !email || !password || !phoneNo || !gender) {
      setOpenSnackbar(true);
      return;
    }

    const registrationData = {
      name,
      email,
      password,
      phoneno: phoneNo,
      gender,
    };

    try {
      const response = await Registration(registrationData);
      console.log(response);

      if (response.success) {
        setRegistrationSuccess(true);
      }
    } catch (error) {
      console.error('Registration Error:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h2" align="center" gutterBottom>
          Registration Page
        </Typography>

        {registrationSuccess ? (
          <Typography variant="body1" color="success" align="center" gutterBottom>
            Registration successfully done!
          </Typography>
        ) : (
          <form>
            <TextField
              label="Name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />

            <TextField
              label="Phone Number"
              type="tel"
              fullWidth
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              margin="normal"
              required
            />

            <TextField
              label="Gender"
              type="text"
              fullWidth
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              margin="normal"
              required
            />

            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleRegistration}
              fullWidth
              style={{ marginTop: 20 }}
            >
              Register
            </Button>
          </form>
        )}

        <Box mt={2} textAlign="center">
          <Typography variant="body1">
            Already have an account? <Link to="/">Login here</Link>.
          </Typography>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Please fill in all required fields."
      />
    </Container>
  );
};

export default RegistrationPage;
