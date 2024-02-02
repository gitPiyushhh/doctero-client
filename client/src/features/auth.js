import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { updateUser } from '../services/apiAuth';
import { useSelector } from 'react-redux';

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
        'https://doctero-api-onrender.onrender.com/api/v1/auth/signup',
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
      alert(err.response.data.message)
      console.error(err);
    }
  },
);

export const login = createAsyncThunk('auth/login', async function (formData) {
  try {
    // 1. Backend request
    const data = await axios.post(
      'https://doctero-api-onrender.onrender.com/api/v1/auth/login',
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

// We ll update the used isOnboard after onboarding and next time onwards whenever we get that user, we will get the updated isOnboard state.. Also the state of isPatient should be updated for further reference 🙂
export const onboard = createAsyncThunk('auth/onboard', async function () {
  const userData = useSelector((state) => state.auth.user);

  try {
    const currentUser = userData || JSON.parse(localStorage.getItem('user'));
    const updatedUser = { ...currentUser, isOnboard: true };

    // 1. Backend request
    const res = await updateUser(updatedUser);

    // Set to local storage
    localStorage.setItem('user', JSON.stringify(res.data.user));

    if (res.status !== 200) {
      throw new Error(`${res.error.message}`);
    }
  } catch (err) {
    alert(err.message);
    console.log(err);
  }
});

/*
  Slice
*/
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    deleteUser(state, action) {
      state.user = null;
      state.token = null;
    },
    patchUser(state, action) {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(signup.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'idle';
        state.token = action.payload?.token;
        state.user = action.payload?.user;
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
        state.user = action.payload?.user;
        state.token = action.payload?.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error;
        console.log(state.error);
      })
      .addCase(onboard.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(onboard.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.user;
      })
      .addCase(onboard.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error;
      }),
});

/*
  Action creators
*/
export const { deleteUser, patchUser } = authSlice.actions;

/*
  Reducers
*/
export default authSlice.reducer;
