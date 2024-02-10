import { createSlice } from "@reduxjs/toolkit"

/*
  Intiial state
*/
const initialState = {
    duration: '',
    mobileSidebarOpen: false
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openMobileSideBar(state, action) {
            state.mobileSidebarOpen = true;
        },
        closeMobileSideBar(state, action) {
            state.mobileSidebarOpen = false;
        }
    }
})

export const {openMobileSideBar, closeMobileSideBar} = uiSlice.actions

export default uiSlice.reducer;