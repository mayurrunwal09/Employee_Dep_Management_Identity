
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDepartment, addEmployee, addSalary, deleteDepartment, deleteEmployee, deleteSalary, getAllDepartments, getAllEmployee, getAllSalary, updateDepartment, updateEmployee, updateSalary } from '../BaseURL/BaseUrl';



export const fetchDepartments = createAsyncThunk('salary/fetchDepartments', async () => {
    const response = await getAllSalary();
    console.log(response);
    return response;
  });

  export const addDep = createAsyncThunk('salary/addDep', async (data) => {
    const response = await addSalary(data);
    console.log(response);
    return response;
  });
  
  export const updateDep = createAsyncThunk('salary/updateDep', async (data) => {
    const response = await updateSalary(data);
    console.log(response);
    return response;
  });
  
  export const deleteDep = createAsyncThunk('salary/deleteDep', async (id) => {
    const response = await deleteSalary(id);
    console.log(response);
    return response;
  });
  
  



const salarySlice = createSlice({
    name: 'salary',
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
        });
    },
  });
  
  export default salarySlice.reducer;
