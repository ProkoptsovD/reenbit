import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import friendsSliceReducer from './friends/friendsSlice';
import chatsSliceReducer from './chats/chatsSlice';
import filterSliceReducer from './filter/filterSlice';
import userSliceReducer from './user/userSlice';
import { storageKey } from 'constants';

const persistConfig = {
    key: storageKey.persistRootKey,
    storage,
    whitelist: Object.keys(storageKey.whiteListedKeys)
}


const rootReducer = combineReducers({
    friends: friendsSliceReducer,
    chats: chatsSliceReducer,
    filter: filterSliceReducer,
    user: userSliceReducer, 
})

export const persistedReducer = persistReducer(persistConfig, rootReducer);