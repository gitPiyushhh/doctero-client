import { createSlice } from "@reduxjs/toolkit";
const initialData = [
    {
        orderId: '#1234',
        status: 'Successful',
        transactionId: '131634495747',
        redund: 'Today, 08:35 PM',
        orderAmount: '₹1,125.00'
    },
    {
        orderId: '#2178',
        status: 'Pending',
        transactionId: '131634495747',
        redund: 'Yesterday, 3:00 PM',
        orderAmount: '₹1,125.00'
    },
    {
        orderId: '#3290',
        status: 'Failed',
        transactionId: '131634495747',
        redund: '12 Jul 2023, 03:00 PM',
        orderAmount: '₹1,125.00'
    },
    {
        orderId: '#4678',
        status: 'Successful',
        transactionId: '131634495747',
        redund: 'Today, 08:35 PM',
        orderAmount: '₹1,125.00'
    },
    {
        orderId: '#5209',
        status: 'Successful',
        transactionId: '131634495747',
        redund: '12 Jul 2023, 03:00 PM',
        orderAmount: '₹1,125.00'
    },
    {
        orderId: '#7109',
        status: 'Successful',
        transactionId: '131634495747',
        redund: '12 Jul 2023, 03:00 PM',
        orderAmount: '₹1,125.00'
    },
]

const initialState = {
    data: initialData
}

const billingSlice = createSlice({
    name: 'billing',
    initialState,
    reducers: {
        filter(state, action) {
            state.data = initialData.filter(item => item.orderId.includes(action.payload) || item.transactionId.includes(action.payload))
        }
    }
})

export const {filter} = billingSlice.actions

export default billingSlice.reducer;