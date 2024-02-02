import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { transformDate } from '../utilities/transformDate';

const API_URL = 'https://doctero-api-onrender.onrender.com/api/v1';
/*
  Meta data
*/
const initialData = [];

const transformAppointment = (appointment) => {
  return {
    appointmentId: `#${
      appointment._id.slice(0, 4) +
      '...' +
      appointment._id.slice(-4, appointment._id.length)
    }`,
    name: appointment.patient.name,
    problem: `${
      appointment?.problem?.length ? appointment.problem : 'No problem spcified'
    }`,
    date: `${transformDate(appointment.date, appointment.startTime)}`,
    type: `${appointment.type}`,
  };
};

/*
  Intial state
*/
const initialState = {
  status: 'idle',
  data: { appointments: initialData },
  remote: { appointments: initialData },
  span: 'Month',
  sort: 'Sort',
  todayAppointments: 0,
  tableDataPhysical: [],
  tableDataRemote: [],
  error: '',
};

/*
  Thunks
*/
export const getAllAppointments = createAsyncThunk(
  'appointment/getAllAppointments',
  async function ({ doctor, patient }) {
    try {
      const data = doctor
        ? await axios.get(`${API_URL}/therapists/appointments/${doctor}`)
        : await axios.get(`${API_URL}/patients/appointments/${patient}`);

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
  async function ({ doctor, patient }) {
    try {
      const data = doctor
        ? await axios.get(
            `${API_URL}/therapists/appointments/${doctor}?type=Remote`,
          )
        : await axios.get(
            `${API_URL}/patients/appointments/${patient}?type=Remote`,
          );

      const appointments = data.data.data.appointments;
      return { appointments };
    } catch (err) {
      alert(err.response.data.message);
      console.error(err);
    }
  },
);

export const getTodayAppointments = createAsyncThunk(
  'appointment/getTodayAppointments',
  async function ({ doctor, patient }) {
    try {
      let data = doctor
        ? await axios.get(
            `${API_URL}/therapists/appointments/${doctor}?sortBy=date&sortOrder=asc&dateRange=Today`,
          )
        : await axios.get(
            `${API_URL}/patients/appointments/${patient}?type=Remote&sortBy=date&sortOrder=asc&dateRange=Today`,
          );

      let dataRemote = doctor
        ? await axios.get(
            `${API_URL}/therapists/appointments/${doctor}?type=Remote&sortBy=date&sortOrder=asc&dateRange=Today`,
          )
        : await axios.get(
            `${API_URL}/patients/appointments/${patient}?type=Remote&sortBy=date&sortOrder=asc&dateRange=Today`,
          );

      return data.data.results + dataRemote.data.results;
    } catch (err) {
      alert(err.response.data.message);
      console.error(err);
    }
  },
);

export const getSortedRecentPhysicalAppointments = createAsyncThunk(
  'appointment/getSortedRecentAppointmentsPhysical',
  async function ({ doctor, span, patient }) {
    try {
      let data = doctor
        ? await axios.get(
            `${API_URL}/therapists/appointments/${doctor}?sortBy=date&sortOrder=desc&dateRange=${span}`,
          )
        : await axios.get(
            `${API_URL}/patients/appointments/${patient}?sortBy=date&sortOrder=desc&dateRange=${span}`,
          );

      const appointments = data.data.data.appointments;
      return { appointments };
    } catch (err) {
      alert(err.response.data.message);
      console.error(err);
    }
  },
);

export const getSortedOldestPhysicalAppointments = createAsyncThunk(
  'appointment/getSortedOldestAppointmentsPhysical',
  async function ({ doctor, patient, span }) {
    try {
      const data = doctor
        ? await axios.get(
            `${API_URL}/therapists/appointments/${doctor}?sortBy=date&sortOrder=asc&dateRange=${span}`,
          )
        : await axios.get(
            `${API_URL}/patients/appointments/${patient}?sortBy=date&sortOrder=asc&dateRange=${span}`,
          );

      const appointments = data.data.data.appointments;
      return { appointments };
    } catch (err) {
      alert(err.response.data.message);
      console.error(err);
    }
  },
);

export const getSpanPhysicalAppointments = createAsyncThunk(
  'appointment/getSpanPhysicalAppointmentsThisMonth',
  async function ({ doctor, patient, span }) {
    try {
      const data = doctor
        ? await axios.get(
            `${API_URL}/therapists/appointments/${doctor}?dateRange=${span}`,
          )
        : await axios.get(
            `${API_URL}/patients/appointments/${patient}?dateRange=${span}`,
          );

      const appointments = data.data.data.appointments;
      return { appointments };
    } catch (err) {
      alert(err.response.data.message);
      console.error(err);
    }
  },
);

export const getSpanRemoteAppointments = createAsyncThunk(
  'appointment/getSpanRemoteAppointmentsThisMonth',
  async function ({ doctor,patient, span }) {
    try {
      const data = doctor
        ? await axios.get(
            `${API_URL}/therapists/appointments/${doctor}?dateRange=${span}&type=Remote`,
          )
        : await axios.get(
            `${API_URL}/patients/appointments/${patient}?dateRange=${span}&type=Remote`,
          );

      const appointments = data.data.data.appointments;
      return { appointments };
    } catch (err) {
      alert(err.response.data.message);
      console.error(err);
    }
  },
);

export const getSortedRecentRemoteAppointments = createAsyncThunk(
  'appointment/getSortedRecentAppointmentsRemote',
  async function ({ doctor, patient, span }) {
    try {
      const data = doctor
        ? await axios.get(
            `${API_URL}/therapists/appointments/${doctor}?type=Remote&sortBy=date&sortOrder=desc&dateRange=${span}`,
          )
        : await axios.get(
            `${API_URL}/patients/appointments/${patient}?type=Remote&sortBy=date&sortOrder=desc&dateRange=${span}`,
          );

      const appointments = data.data.data.appointments;
      return { appointments };
    } catch (err) {
      alert(err.response.data.message);
      console.error(err);
    }
  },
);

export const getSortedOldestRemoteAppointments = createAsyncThunk(
  'appointment/getSortedOldestAppointmentsRemote',
  async function ({ doctor, patient, span }) {
    try {
      const data = doctor
        ? await axios.get(
            `${API_URL}/therapists/appointments/${doctor}?type=Remote&sortBy=date&sortOrder=asc&dateRange=${span}`,
          )
        : await axios.get(
            `${API_URL}/patients/appointments/${patient}?type=Remote&sortBy=date&sortOrder=asc&dateRange=${span}`,
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
        action.payload === 'physical' ? state.data : state.remote.appointments;
    },
    updateSpanAppointments(state, action) {
      state.span = action.payload;
    },
    updateSortAppointments(state, action) {
      state.sort = action.payload;
    },
    createFakeLoading(state, action) {
      state.status = action.payload;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllAppointments.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
        state.tableDataPhysical =
          action.payload.appointments.map(transformAppointment);
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
        state.tableDataRemote =
          action.payload.appointments.map(transformAppointment);
      })
      .addCase(getAllRemoteAppointments.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(getSortedRecentPhysicalAppointments.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(
        getSortedRecentPhysicalAppointments.fulfilled,
        (state, action) => {
          state.status = 'idle';
          state.data = action.payload;
          state.tableDataPhysical =
            action.payload.appointments.map(transformAppointment);
        },
      )
      .addCase(
        getSortedRecentPhysicalAppointments.rejected,
        (state, action) => {
          state.status = 'error';
          state.error = action.error.message;
        },
      )
      .addCase(getSortedOldestPhysicalAppointments.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(
        getSortedOldestPhysicalAppointments.fulfilled,
        (state, action) => {
          state.status = 'idle';
          state.data = action.payload;
          state.tableDataPhysical =
            action.payload.appointments.map(transformAppointment);
        },
      )
      .addCase(
        getSortedOldestPhysicalAppointments.rejected,
        (state, action) => {
          state.status = 'error';
          state.error = action.error.message;
        },
      )
      .addCase(getSortedRecentRemoteAppointments.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getSortedRecentRemoteAppointments.fulfilled, (state, action) => {
        state.status = 'idle';
        state.remote = action.payload;
        state.tableDataRemote =
          action.payload.appointments.map(transformAppointment);
      })
      .addCase(getSortedRecentRemoteAppointments.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(getSortedOldestRemoteAppointments.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getSortedOldestRemoteAppointments.fulfilled, (state, action) => {
        state.status = 'idle';
        state.remote = action.payload;
        state.tableDataRemote =
          action.payload.appointments.map(transformAppointment);
      })
      .addCase(getSortedOldestRemoteAppointments.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(getSpanPhysicalAppointments.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getSpanPhysicalAppointments.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
        state.tableDataPhysical =
          action.payload.appointments.map(transformAppointment);
      })
      .addCase(getSpanPhysicalAppointments.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(getSpanRemoteAppointments.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getSpanRemoteAppointments.fulfilled, (state, action) => {
        state.status = 'idle';
        state.remote = action.payload;
        state.tableDataRemote =
          action.payload.appointments.map(transformAppointment);
      })
      .addCase(getSpanRemoteAppointments.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(getTodayAppointments.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getTodayAppointments.fulfilled, (state, action) => {
        state.status = 'idle';
        state.todayAppointments = action.payload;
      })
      .addCase(getTodayAppointments.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      }),
});

export const {
  filter,
  changeActiveTab,
  updateSpanAppointments,
  updateSortAppointments,
  createFakeLoading
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
