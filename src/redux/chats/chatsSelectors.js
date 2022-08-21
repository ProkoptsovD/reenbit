import { friendsSelectors } from 'redux/friends/friendsSelectors';
import { createSelector } from 'reselect';


const getChatsFeature = state => state.chats;

const getAllConversations = createSelector(
    getChatsFeature,
    (chats) => chats.conversations
)

const getChatWithSelectedFriend = createSelector(
    getAllConversations,
    (state) => friendsSelectors.getSelectedFriendId(state),
    (allConversations, friendId) => allConversations[friendId]
)

const getConversationWithFriend = friendId => createSelector(
    getAllConversations,
    allConversations => allConversations[friendId] ?? []
);

const getOnlyFriendMessages = friendId => createSelector(
    getAllConversations,
    (allConversations) => allConversations[friendId]?.filter(({ from }) => from === friendId ) ?? []
);

const getLastMessage = friendId => createSelector(
    getOnlyFriendMessages(friendId),
    getConversationWithFriend(friendId),
    (friendMessagesOnly, allMessagesInConversation) => {
        const lastAnyMessageIndex = allMessagesInConversation.length - 1;
        const lastFriendMessageIndex = friendMessagesOnly.length - 1;
        const lastMessage = friendMessagesOnly[lastFriendMessageIndex] ?? allMessagesInConversation[lastAnyMessageIndex];

        return lastMessage;
    }
);

const getUnreadMessagesQuantaty = friendId => createSelector(
    getOnlyFriendMessages(friendId),
    (onlyFriendMessages) => onlyFriendMessages.filter(({ isRead }) => !isRead)?.length ?? 0
);

export const chatsSelectors = {
    getAllConversations,
    getConversationWithFriend,
    getOnlyFriendMessages,
    getChatWithSelectedFriend,
    getLastMessage,
    getUnreadMessagesQuantaty
}
