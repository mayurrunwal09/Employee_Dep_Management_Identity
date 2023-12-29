
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { addDepartment, addEmployee, deleteDepartment, deleteEmployee, getAllDepartments, getAllEmployee, updateDepartment, updateEmployee } from '../BaseURL/BaseUrl';



// export const fetchDepartments = createAsyncThunk('department/fetchDepartments', async () => {
//     const response = await getAllEmployee();
//     console.log(response);
//     return response;
//   });

//   export const addDep = createAsyncThunk('department/addDep', async (data) => {
//     const response = await addEmployee(data);
//     console.log(response);
//     return response;
//   });
  
//   export const updateDep = createAsyncThunk('department/updateDep', async (data) => {
//     const response = await updateEmployee(data);
//     console.log(response);
//     return response;
//   });
  
//   export const deleteDep = createAsyncThunk('department/deleteDep', async (id) => {
//     const response = await deleteEmployee(id);
//     console.log(response);
//     return response;
//   });
  
  

// // Other async thunks for add, update, and delete...

// const employeeSlice = createSlice({
//     name: 'department',
//     initialState: {
//       departments: [], // Make sure it is initialized as an empty array
//       status: 'idle',
//       error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//       builder
//         .addCase(fetchDepartments.pending, (state) => {
//           state.status = 'loading';
//         })
//         .addCase(fetchDepartments.fulfilled, (state, action) => {
//           state.status = 'succeeded';
//           state.departments = action.payload;
//         })
//         .addCase(fetchDepartments.rejected, (state, action) => {
//           state.status = 'failed';
//           state.error = action.error.message;
//         });
//     },
//   });
  
//   export default employeeSlice.reducer;















import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDepartment, addEmployee, deleteDepartment, deleteEmployee, getAllDepartments, getAllEmployee, updateDepartment, updateEmployee } from '../BaseURL/BaseUrl';



export const fetchemp = createAsyncThunk('department/fetchemp', async () => {
    const response = await getAllEmployee();
    console.log(response);
    return response;
  });

  export const addemp = createAsyncThunk('department/addemp', async (data) => {
    const response = await addEmployee(data);
    console.log(response);
    return response;
  });
  
  export const updateemp = createAsyncThunk('department/updateemp', async (data) => {
    const response = await updateEmployee(data);
    console.log(response);
    return response;
  });
  
  export const deleteemp = createAsyncThunk('department/deleteemp', async (id) => {
    const response = await deleteEmployee(id);
    console.log(response);
    return response;
  });
  
  

// Other async thunks for add, update, and delete...

const employeeSlice = createSlice({
    name: 'department',
    initialState: {
      departments: [], // Make sure it is initialized as an empty array
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchemp.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchemp.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.departments = action.payload;
        })
        .addCase(fetchemp.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });
  
  export default employeeSlice.reducer;
