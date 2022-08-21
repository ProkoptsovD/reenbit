const persistBaseKey = 'persist:';
const persistRootKey = 'reenbit';

export const storageKey = {
    persistRootKey,
    persistRootKeyInStorage: persistBaseKey + persistRootKey,
    whiteListedKeys: {
        chats: 'chats',
        user: 'user',
        friends: 'friends'
    },
    draftMessage: 'draftMessage'
}