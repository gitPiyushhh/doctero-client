import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './features/ui';
import billingReducer from './features/billing';
import authReducer from './features/auth';
import patientReducer from './features/patients';
import appointmentReducer from './features/appointment';
import dashboardReducer from './features/dashboard';
import { doctorApi } from "./services/doctorApi";


const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        patient: patientReducer,
        appointment: appointmentReducer,
        dashboard: dashboardReducer,
        billing: billingReducer,
        [doctorApi.reducerPath]: doctorApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(doctorApi.middleware),
});

export default store;
