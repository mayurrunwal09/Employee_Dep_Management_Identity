import { configureStore } from '@reduxjs/toolkit';
import departmentSlice from './Slices/departmentSlice';
import employeeSlice from './Slices/employeeSlice';
import salarySlice from './Slices/salarySlice';
import loginSlice from './Slices/loginSlice';

const store = configureStore({
  reducer: {
    department: departmentSlice,
    employee : employeeSlice,
    salary : salarySlice,
    login : loginSlice,

    
  },
});

export default store;
