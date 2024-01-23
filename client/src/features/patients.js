import { createSlice } from '@reduxjs/toolkit';
const initialData = [];

const initialState = {
  data: initialData,
  span: 'Year'
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    filter(state, action) {
      state.data = initialData.filter(
        (item) =>
          item.name.includes(action.payload) ||
          item.patientId.includes(action.payload),
      );
    },
    changeSpan(state, action) {
      state.span = action.payload;
    }
  },
});

export const { filter, changeSpan } = patientSlice.actions;

export default patientSlice.reducer;
