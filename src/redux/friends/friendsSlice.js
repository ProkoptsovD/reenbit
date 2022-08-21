import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    selectedFriendId: null
};

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        setFriends(state, { payload }) {
            state.items = payload;
        },
        setSelectedFriend(state, { payload }) {
            state.selectedFriendId = payload
        }
    },
})

export const friendsActions = friendsSlice.actions;
export default friendsSlice.reducer;