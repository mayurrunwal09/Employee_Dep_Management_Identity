import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Login } from '../BaseURL/BaseUrl';

export const loginUser = createAsyncThunk('login/loginUser', async (data) => {
  const response = await Login(data);
  console.log(response);
  return response;
});

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.isAuthenticated = false;
        state.error = action.error.message;
      });
  },
});

export default loginSlice.reducer;
