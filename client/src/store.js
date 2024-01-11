import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './features/ui'
import dataReducer from './features/data';
import authReducer from './features/auth'

const store = configureStore({
    reducer: {
        ui: uiReducer,
        data: dataReducer,
        auth: authReducer
    }
})

export default store