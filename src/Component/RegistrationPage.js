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
  MenuItem
} from '@mui/material';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [gender, setGender] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneNoError, setPhoneNoError] = useState('');
  const [genderError, setGenderError] = useState('');

  const handleRegistration = async () => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      setOpenSnackbar(true);
      return;
    }

 
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 6 characters long, contain at least one letter, one number, and one special character (@$!%*#?&)'
      );
      setOpenSnackbar(true);
      return;
    }

 
    if (!name.trim()) {
      setNameError('Name is required');
      setOpenSnackbar(true);
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNo)) {
      setPhoneNoError('Invalid phone number (10 digits expected)');
      setOpenSnackbar(true);
      return;
    }

   
    if (!gender) {
      setGenderError('Gender is required');
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
    <Container component="main" maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
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
              onChange={(e) => {
                setName(e.target.value);
                setNameError('');
              }}
              margin="normal"
              required
              error={!!nameError}
              helperText={nameError}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              margin="normal"
              required
              error={!!emailError}
              helperText={emailError}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              margin="normal"
              required
              error={!!passwordError}
              helperText={passwordError}
            />

            <TextField
              label="Phone Number"
              type="tel"
              fullWidth
              value={phoneNo}
              onChange={(e) => {
                setPhoneNo(e.target.value);
                setPhoneNoError('');
              }}
              margin="normal"
              required
              error={!!phoneNoError}
              helperText={phoneNoError}
            />

            <TextField
              label="Gender"
              select
              fullWidth
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                setGenderError('');
              }}
              margin="normal"
              required
              error={!!genderError}
              helperText={genderError}
            >
              <MenuItem value="" disabled>
                Select Gender
              </MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>

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
        message="Please fill in all required fields correctly."
      />
    </Container>
  );
};

export default RegistrationPage;
