import { useSelector } from 'react-redux';
import { friendsSelectors } from 'redux/friends/friendsSelectors';

import Friend from 'components/Friend';
import PropTypes from 'prop-types';
import styles from './ChatList.module.scss';

const ChatList = ({ chatListStyles = '', listItemStyles = ''}) => {
    const sortedFriendsByMostRecentMessage = useSelector(friendsSelectors.getAllFriendSortedByMostRecentMessage);
    const filteredFriends = useSelector(friendsSelectors.getFilteredFriends);

    const shouldRenderFriends = sortedFriendsByMostRecentMessage.length;
    const friendsToRender = filteredFriends.length ? filteredFriends : sortedFriendsByMostRecentMessage

    // styles
    const chatListCss = `${styles.chat_list ?? ''} ${chatListStyles}`;
    const listItemsCss = `${styles.list_item} ${listItemStyles}`;

    return (
        <>
            {
                shouldRenderFriends
                    ?   <ul className={ chatListCss }>
                            {
                                friendsToRender.map(friend => (
                                    <li
                                        key={ friend.id }
                                        className={ listItemsCss }
                                    >
                                        <Friend {...friend}/>
                                    </li>
                                ))
                            }
                        </ul>
                    : null
            }
        </>
    )
}

ChatList.propTypes = {
    chatListStyles: PropTypes.string,
    listItemStyles: PropTypes.string,
}

export default ChatList;