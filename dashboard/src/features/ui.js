import { createSlice } from "@reduxjs/toolkit"

/*
  Intiial state
*/
const initialState = {
    month: ''
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        changeMonth(state, action) {
            
        }
    }
})

export const {changeMonth} = uiSlice.actions

export default uiSlice;