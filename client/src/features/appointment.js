import { createSlice } from '@reduxjs/toolkit';
const initialData = [
    {
      patientId: '#5678',
      name: 'Sara',
      contact: '19876543210',
      problem: 'Fever',
      startDate: '2022-03-15T10:30:00Z',
      action: 'visit',
    },
    {
      patientId: '#7890',
      name: 'John',
      contact: '15551234567',
      problem: 'Back Pain',
      startDate: '2022-03-16T09:45:00Z',
      action: 'call',
    },
    {
      patientId: '#2345',
      name: 'Aisha',
      contact: '17778889999',
      problem: 'Headache',
      startDate: '2022-03-17T14:15:00Z',
      action: 'call',
    },
    {
      patientId: '#6789',
      name: 'David',
      contact: '16504321987',
      problem: 'Allergies',
      startDate: '2022-03-18T11:00:00Z',
      action: 'visit',
    },
    {
      patientId: '#3456',
      name: 'Maria',
      contact: '18887776666',
      problem: 'Stomachache',
      startDate: '2022-03-19T16:45:00Z',
      action: 'call',
    },
];

const initialState = {
  data: initialData,
};

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
  },
});

export const { filter } = appointmentSlice.actions;

export default appointmentSlice.reducer;
