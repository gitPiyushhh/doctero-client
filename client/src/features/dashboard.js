import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activePatient: null
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    changeActivePatient(state, action) {
        state.activePatient = action.payload;
    }
  },
});

export const { changeActivePatient } = dashboardSlice.actions;

export default dashboardSlice.reducer;
