import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getAuthenticationToken = () => {
  const token = localStorage.getItem('accessToken');
  return token ? `Bearer ${token}` : '';
}

export const fetchEmployees = createAsyncThunk('employee/fetchEmployees', async () => {
  const response = await axios.get(`https://localhost:44331/api/Employee/GetAllEmployee`, {
    headers: {
      Authorization: getAuthenticationToken(),
    }
  });
  console.log(response);
  return response.data;
});


export const addEmployee = createAsyncThunk('employee/addEmployee', async (data) => {
  const response = await axios.post(`https://localhost:44331/api/Employee/InserEmployee`, data, {
    headers: {
      Authorization: getAuthenticationToken(),
    },
  });
  return response.data;
});

export const updateEmployee = createAsyncThunk('employee/updateEmployee', async (data) => {
  const response = await axios.put(`https://localhost:44331/api/Employee/UpdateEmployee`, data, {
    headers: {
      Authorization: getAuthenticationToken(),
    },
  });
  return response.data;
});

export const deleteEmployee = createAsyncThunk('employee/deleteEmployee', async (id) => {
  const response = await axios.delete(`https://localhost:44331/api/Employee/DeleteEmployee?id=${id}`, {
    headers: {
      Authorization: getAuthenticationToken(),
    },
  });
  return response.data;
});

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
     
      .addCase(addEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
    
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      .addCase(updateEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
     
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      .addCase(deleteEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
       
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
