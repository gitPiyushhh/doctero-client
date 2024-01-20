import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const API_URL = 'http://localhost:8000/api/v1/therpists';

const doctor = localStorage.getItem('user');

export const doctorApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: () =>
        `/appointments/${doctor}?page=1&status=Completed&dateRange=last7days&type=Out patient&sortBy=date&sortOrder=asc`,
    }),
  }),
});

export const { useGetAppointmentsQuery } = doctorApi;
