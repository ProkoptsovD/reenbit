import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { friendsActions } from 'redux/friends/friendsSlice';
import { chatsSelectors } from 'redux/chats/chatsSelectors';
import { friendsSelectors } from 'redux/friends/friendsSelectors';
import PropTypes from 'prop-types';

import Avatar from "components/common/Avatar";
import CreatedAt from 'components/common/CreatedAt';
import styles from './Friend.module.scss';
import Unread from 'components/common/Unread';

const Friend = ({
    cardStyles = '',
    nameStyles = '',
    lastMessageStyles = '',
    dialogMode,
    firstName,
    lastName,
    avatar,
    isOnline,
    id
}) => {
    const dispatch = useDispatch();
    const [ showNotication ] = useState(true);
    const selectedChat = useSelector(friendsSelectors.getSelectedFriendId);
    const unread = useSelector(chatsSelectors.getUnreadMessagesQuantaty(id));
    const lastMessage = useSelector(chatsSelectors.getLastMessage(id));
    const shouldRenderLastMessage = !dialogMode && lastMessage;
    const shouldRenderNewMessageNotification = showNotication && (unread > 0) && (selectedChat !== id);

    // styles
    const cardCss = `${styles.friend_card} ${cardStyles}`;
    const nameCss = `${styles.friend_name} ${nameStyles}`;
    const lastMessageCss = `${styles.last_message} ${lastMessageStyles}`;

    return (
        <div
            className={ cardCss }
            onClick={() => {
                if(selectedChat !== id) {
                    dispatch(friendsActions.setSelectedFriend(id));
                }
            }}
        >
            <Avatar
                stylesWrapper={ styles.avatar_wrapper }
                url={ avatar }
                userName={ firstName + ' ' + lastName }
                isOnline={ isOnline }
            />
            <div className={ styles.name_wrapper }>
                <p className={ nameCss } >
                    {firstName} {lastName}
                </p>
                {
                    shouldRenderLastMessage &&  <p className={ lastMessageCss } >
                                                    { lastMessage.message }
                                                </p>
                }
            </div>
            {
                shouldRenderLastMessage &&  <CreatedAt
                                                date={ +lastMessage?.createdAt }
                                                textStyles={ styles.created_at }
                                            />
            }
            { shouldRenderNewMessageNotification && <Unread number={ unread } wrapperStyles={ styles.unread }/> }
        </div>
    )
}

Friend.propTypes = {
    cardStyles: PropTypes.string,
    nameStyles: PropTypes.string,
    lastMessageStyles: PropTypes.string,
    dialogMode: PropTypes.bool,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatar: PropTypes.string,
    isOnline: PropTypes.bool,
    id: PropTypes.string
}

export default Friend;