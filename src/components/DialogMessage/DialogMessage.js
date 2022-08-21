import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from "components/common/Avatar";
import CreatedAt from "components/common/CreatedAt";
import styles from './DialogMessage.module.scss';
import { userSelectors } from 'redux/user/userSelectors';
import { friendsSelectors } from 'redux/friends/friendsSelectors';

const DialogMessage = ({
    messageText,
    sender,
    date,
    wrapperStyles = '',
    messageFriendStyles = '',
    messageUserStyles = '',
    innerWrapperStyles = ''
}) => {
    const friend = useSelector(friendsSelectors.getSelectedFriendProfile);
    const user = useSelector(userSelectors.getUser);
    const isUserSender = sender === user.userId;

    // styles
    const wrapper = `${styles.wrapper} ${wrapperStyles} ${isUserSender ? 'flexEnd' : '' }`;
    const message = `message ${isUserSender ? 'fromUser' : 'fromFriend'} ${messageFriendStyles} ${messageUserStyles}`;

    return (
        <div className={ wrapper } >
            {
                !isUserSender && <Avatar
                                    stylesWrapper={ styles.avatar }
                                    dialogMode
                                    url={ friend.avatar }
                                    userName={ friend.firstName + ' ' + friend.lastName }
                                />
            }
            <div className={ innerWrapperStyles} >
                <p className={ message }>
                    { messageText }
                </p>
                <CreatedAt
                    date={ +date }
                    precise
                    textStyles={ styles.created_at }
                />
            </div>
        </div>
    )
}

DialogMessage.propTypes = {
    messageText: PropTypes.string.isRequired,
    recieved: PropTypes.bool,
    wrapperStyles: PropTypes.string,
    messageFriendStyles: PropTypes.string,
    messageUserStyles: PropTypes.string,
    innerWrapperStyles: PropTypes.string
}

export default DialogMessage;