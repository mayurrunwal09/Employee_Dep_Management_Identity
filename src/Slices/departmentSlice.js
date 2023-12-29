// src/Slices/Department/departmentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDepartment, deleteDepartment, getAllDepartments, updateDepartment } from '../BaseURL/BaseUrl';



export const fetchDepartments = createAsyncThunk('department/fetchDepartments', async () => {
    const response = await getAllDepartments();
    console.log(response);
    return response;
  });

  export const addDep = createAsyncThunk('department/addDep', async (data) => {
    const response = await addDepartment(data);
    console.log(response);
    return response;
  });
  
  export const updateDep = createAsyncThunk('department/updateDep', async (data) => {
    const response = await updateDepartment(data);
    console.log(response);
    return response;
  });
  
  export const deleteDep = createAsyncThunk('department/deleteDep', async (id) => {
    const response = await deleteDepartment(id);
    console.log(response);
    return response;
  });
  
  

// Other async thunks for add, update, and delete...

const departmentSlice = createSlice({
    name: 'department',
    initialState: {
      departments: [], // Make sure it is initialized as an empty array
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
        });
    },
  });
  
  export default departmentSlice.reducer;
