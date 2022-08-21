import { createSlice } from '@reduxjs/toolkit';
import { messageTypes } from 'constants';
import { friendsActions } from 'redux/friends/friendsSlice';

const initialState = {
    conversations: {}
};

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats(state, { payload }) {
            state.conversations = payload;
        },
        addMessageToChat: {
            reducer: (state, action) => {
                const { friendId, message } = action.payload;
                
                state.conversations[friendId].push(message);
            },
            prepare: (friendId, userId, message, messageType) => {
                let from = '';
                let to = '';

                switch(messageType) {
                    case messageTypes.sent:
                        from = userId;
                        to = friendId;
                        break;
                    case messageTypes.recieved:
                        from = friendId;
                        to = userId;
                        break;
                    default:
                        throw new Error('Unsupported message type');
                }

                return {
                    payload: { friendId, message: { message, createdAt: Date.now(), from, to, } }
                }
            }
        },
    },
    extraReducers: {
        [friendsActions.setSelectedFriend](state, { payload }) {
            state.conversations[payload].forEach(msg => msg.isRead = true)
        }
    }
})

export const chatsActions = chatsSlice.actions;
export default chatsSlice.reducer;