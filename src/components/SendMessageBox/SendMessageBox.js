import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useSound from 'use-sound';
import newMessageSound from '../../assets/sounds/new-message-notification.mp3';
import styles from './SendMessageBox.module.scss';
import { ReactComponent as SendMessageIcon } from '../../assets/icons/send-message.svg';
import { useDispatch, useSelector } from 'react-redux';
import { friendsSelectors } from 'redux/friends/friendsSelectors';
import { userSelectors } from 'redux/user/userSelectors';
import { chatsActions } from 'redux/chats/chatsSlice';
import { messageTypes } from 'constants';
import { chuckNorrisApi } from 'services/chuckNorrisApi';
import { initializeOnRefresh } from 'utils/initializeOnRefresh';
import { storageKey } from 'constants';
import { storage } from 'services/storage';


const SendMessageBox = ({
    boxStyles = '',
    innerWrapperStyles = '',
    inputStyles = '',
    buttonStyles = '',
    iconStyles = '',
    ...restProps
}) => {
    const dispatch = useDispatch();

    const [ message, setMessage ] = useState(initializeOnRefresh(storageKey.draftMessage, ''));
    const [ notifyNewMessageRecieved ] = useSound(newMessageSound);
    
    const friendId = useSelector(friendsSelectors.getSelectedFriendId);
    const user = useSelector(userSelectors.getUser);
    
    useEffect(() => {
        storage.save(storageKey.draftMessage, message);

    }, [message]);

    const sendMessage = (e) => {
        e.preventDefault();

        dispatch(chatsActions.addMessageToChat(
            friendId,
            user?.userId,
            message,
            messageTypes.sent
        ));
        
        chuckNorrisApi.getChucksResponseWithDelay(12000)
            .then(messageFromChuck => {
                dispatch(chatsActions.addMessageToChat(
                    friendId,
                    user?.userId,
                    messageFromChuck,
                    messageTypes.recieved
                ));
                notifyNewMessageRecieved();
            });

        setMessage('');
    }

    // styles
    const box = `${styles.box} boxStyles`;
    const innerWrapper = `${styles.inner_wrapper} ${innerWrapperStyles}`;
    const input = `input ${styles.input} ${inputStyles}`;
    const button = `icon_button ${styles.button} ${buttonStyles}`;
    const icon = `${styles.icon} ${iconStyles}`;

    return (
        <form
            className={ box }
            onSubmit={ sendMessage }
        >
            <div className={ innerWrapper }>
                <input
                    className={ input }
                    value={ message }
                    onChange={(e) => setMessage(e.target.value)}
                    {...restProps}
                />
                <button
                    type='submit'
                    className={ button }
                >
                    <SendMessageIcon
                        className={ icon }
                    />
                </button>
            </div>
        </form>
    )
}

SendMessageBox.propTypes = {
    boxStyles: PropTypes.string,
    innerWrapperStyles: PropTypes.string,
    inputStyles: PropTypes.string,
    buttonStyles: PropTypes.string,
    iconStyles: PropTypes.string
}

export default SendMessageBox;