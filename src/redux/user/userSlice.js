import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    userId: '777',
    name: 'John Doe',
    isOnline: true
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserCredentials(state, { payload }) {
            state.token = payload;
        },
        clearUserCredentials(state) {
            state.token = null;
        },
    },
})

export const userActions = userSlice.actions;
export default userSlice.reducer;