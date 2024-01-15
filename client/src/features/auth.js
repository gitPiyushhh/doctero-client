import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/*
  Initial state
*/
const initialState = {
  user: null,
  token: null,
  status: 'idle',
  error: '',
};

/*
  Thunks
*/
export const signup = createAsyncThunk(
  'auth/signup',
  async function (formData) {
    try {
      // 1. Backend request
      const data = await axios.post(
        'http://localhost:8000/api/v1/auth/signup',
        formData,
      );

      const user = data.data.data.user;
      const token = data.data.token;

      // Set to local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // 2. Get token and and new user (payload for the next builder state)
      return {
        user,
        token,
      };
    } catch (err) {
      console.error(err);
    }
  },
);

export const login = createAsyncThunk('auth/login', async function (formData) {
  try {
    // 1. Backend request
    const data = await axios.post(
      'http://localhost:8000/api/v1/auth/login',
      formData,
    );

    const user = data.data.data.user;
    const token = data.data.token;

    // Set the token to local storage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    

    // 2. Get token and and new user (payload for the next builder state)
    return { user, token };
  } catch (err) {
    console.error(err);
    alert(err);
  }
});

/*
  Slice
*/

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser(state, action) {},
  },
  extraReducers: (builder) =>
    builder
      .addCase(signup.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'idle';
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(login.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error;
        console.log(state.error);
      }),
});

/*
  Action creators
*/
export const { addUser } = authSlice.actions;

/*
  Reducers
*/
export default authSlice.reducer;
