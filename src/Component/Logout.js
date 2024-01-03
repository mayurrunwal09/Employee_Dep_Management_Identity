// import React from 'react';
// import {  useNavigate } from 'react-router-dom';

// export const Logout = () => {
//     const navigate = useNavigate();

//     localStorage.removeItem('accessToken');

//     navigate('/');
// }






// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// export const Logout = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
  
//     localStorage.removeItem('accessToken');

    
//     navigate('/');

    
//   }, []); 

 
// };

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';

export const Logout = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setOpenDialog(false);
    navigate('/');
  };

  useEffect(() => {
    setOpenDialog(true);
  }, []); 

  return (
    <Dialog open={openDialog} fullWidth maxWidth="xs">
      <DialogTitle>Logout Confirmation</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Are you sure you want to logout?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)} color="primary">
          No
        </Button>
        <Button onClick={handleLogout} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
