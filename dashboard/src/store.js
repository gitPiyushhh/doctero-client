import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './features/ui'
import dataReducer from './features/data'

const store = configureStore({
    reducer: {
        ui: uiReducer,
        data: dataReducer,
    }
})

export default store