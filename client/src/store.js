import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './features/ui'
import billingReducer from './features/billing';
import authReducer from './features/auth';
import patientReducer from './features/patients';
import appointmentReducer from './features/appointment';

const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        patient: patientReducer,
        appointment: appointmentReducer,
        billing: billingReducer,
    }
})

export default store