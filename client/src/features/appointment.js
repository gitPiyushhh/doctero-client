import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/therapists';
/*
  Meta data
*/
const initialData = [];

/*
  Intial state
*/
const initialState = {
  status: 'idle',
  data: { appointments: initialData },
  remote: { appointments: initialData },
  activeTab: 'physical',
  tabData: [],
  error: '',
};

/*
  Thunks
*/
export const getAllAppointments = createAsyncThunk(
  'appointment/getAllAppointments',
  async function (doctor, { getState }) {
    try {
      const data = await axios.get(`${API_URL}/appointments/${doctor}`);

      const appointments = data.data.data.appointments;
      return { appointments };
    } catch (err) {
      alert(err.response.data.message);
      console.error(err);
    }
  },
);

export const getAllRemoteAppointments = createAsyncThunk(
  'appointment/getAllRemoteAppointments',
  async function (doctor, { getState }) {
    try {
      const data = await axios.get(
        `${API_URL}/appointments/${doctor}?type=Remote`,
      );

      const appointments = data.data.data.appointments;
      return { appointments };
    } catch (err) {
      alert(err.response.data.message);
      console.error(err);
    }
  },
);

/*
  Slice
*/
const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    filter(state, action) {
      state.data = initialData.filter(
        (item) =>
          item.name.includes(action.payload) ||
          item.patientId.includes(action.payload),
      );
    },
    changeActiveTab(state, action) {
      state.tabData =
        action.payload === 'physical'
          ? state.data
          : state.remote.appointments;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllAppointments.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(getAllAppointments.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(getAllRemoteAppointments.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getAllRemoteAppointments.fulfilled, (state, action) => {
        state.status = 'idle';
        state.remote = action.payload;
      })
      .addCase(getAllRemoteAppointments.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      }),
});

export const { filter, changeActiveTab } = appointmentSlice.actions;

export default appointmentSlice.reducer;
