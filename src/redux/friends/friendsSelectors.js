import { chatsSelectors } from 'redux/chats/chatsSelectors';
import { filterSelectors } from 'redux/filter/filterSelectors';
import { createSelector } from 'reselect';

const getFriendsFeature = state => state.friends;

const getAllFriends = createSelector(
    getFriendsFeature,
    (friends) => friends.items
);

const getSelectedFriendId = createSelector(
    getFriendsFeature,
    (friends) => friends.selectedFriendId
);

const getSelectedFriendProfile = createSelector(
    getAllFriends,
    getSelectedFriendId,
    (allFriends, friendId) => allFriends.find(({ id }) => id === friendId)
);

const getAllFriendSortedByMostRecentMessage = createSelector(
    getAllFriends,
    chatsSelectors.getAllConversations,
    (allFriends, allConversations) => {
        const copyAllFriendsArr = [...allFriends];
        const recentMessageTimestamps = allFriends.reduce((acc, { id }) => {
                const onlyFriendMessages = allConversations[id].filter(({ from }) => from === id);
                const lastMessageIndex = onlyFriendMessages?.length ? onlyFriendMessages?.length - 1 : null;
                
                acc[id] = onlyFriendMessages[lastMessageIndex]?.createdAt ?? 0;

                return acc;
            }, {});
        const sortedFriends = copyAllFriendsArr.sort((friendA, friendB) => recentMessageTimestamps[friendB.id] - recentMessageTimestamps[friendA.id])
    
        return sortedFriends;
    }
);

const getFilteredFriends = createSelector(
    getAllFriends,
    (state) => filterSelectors.getFilter(state),
    (allFriends, filter) =>
        filter !== ''
            ? allFriends.filter(({ firstName, lastName }) => {
                    const normalizedFilter = filter?.toLowerCase();
                    const normalizedFirstName = firstName.toLowerCase();
                    const normalizedLastName = lastName.toLowerCase();

                    return normalizedFirstName?.includes(normalizedFilter) || normalizedLastName?.includes(normalizedFilter);
                })
            : []
);

export const friendsSelectors = {
    getFriendsFeature,
    getAllFriends,
    getSelectedFriendId,
    getSelectedFriendProfile,
    getAllFriendSortedByMostRecentMessage,
    getFilteredFriends
}
