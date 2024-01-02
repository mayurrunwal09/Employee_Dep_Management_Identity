import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getAuthenticationToken = () => {
  const token = localStorage.getItem('accessToken');
  return token ? `Bearer ${token}` : '';
}

export const fetchDepartments = createAsyncThunk('department/fetchDepartments', async () => {
  const response = await axios.get(`https://localhost:44331/api/Department/GetAllDepartment`, {
    headers: {
      Authorization: getAuthenticationToken(),
    }
  });
  console.log(response);
  return response.data;
});

export const addDep = createAsyncThunk('department/addDep', async (data) => {
  const response = await axios.post(`https://localhost:44331/api/Department/InsertDepartment`, data, {
    headers: {
      Authorization: getAuthenticationToken(),
    },
  });
  return response.data;
});

export const updateDep = createAsyncThunk('department/updateDep', async (data) => {
  const response = await axios.put(`https://localhost:44331/api/Department/UpdateDepartment`, data, {
    headers: {
      Authorization: getAuthenticationToken(),
    },
  });
  return response.data;
});

export const deleteDep = createAsyncThunk('department/deleteDep', async (id) => {
  const response = await axios.delete(`https://localhost:44331/api/Department/DeleteDepartment?id=${id}`, {
    headers: {
      Authorization: getAuthenticationToken(),
    },
  });
  return response.data;
});

const departmentSlice = createSlice({
  name: 'department',
  initialState: {
    departments: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addDep.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addDep.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(addDep.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateDep.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateDep.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(updateDep.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteDep.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteDep.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(deleteDep.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default departmentSlice.reducer;





