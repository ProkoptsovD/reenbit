import PropTypes from 'prop-types';
import DialogMessage from 'components/DialogMessage';
import styles from './DialogWindow.module.scss';
import { useSelector } from 'react-redux';
import { chatsSelectors } from 'redux/chats/chatsSelectors';
import { useScroll } from 'hooks';

const alertMessages = {
    emptyDialog: 'Seems there is no messages yet. Send a message to start the conversation...',
    absentDialog: 'No chat is selected. Pick up a chat from the left side to see all the messages with a friend...'
}

const DialogWindow = ({
    windwowStyles = '',
    listItemStyles = '',
}) => {
    const chat = useSelector(chatsSelectors.getChatWithSelectedFriend);
    const [ messageRef ] = useScroll(chat);

    const noMessages = !chat?.length;
    const shouldRenderDialogList = chat && !noMessages;
    const shouldRenderNoMessageAlert = chat && noMessages;

    // styles
    const dialogWindow = `${styles.dialog_window} ${windwowStyles}`;
    const listItem = `${styles.list_item} ${listItemStyles}`

    return (
        <div
            className={ dialogWindow }
        >
            {
                !chat &&   <p className={ styles.alert }>
                                { alertMessages.absentDialog }
                                </p>
            }
            {
                shouldRenderNoMessageAlert &&   <p className={ styles.alert }>
                                                    { alertMessages.emptyDialog }
                                                </p>
            }
            {
                shouldRenderDialogList &&   <ul className={ styles.chat_list }>
                                                {
                                                    chat.map(({ message, createdAt, from }) => (
                                                        <li 
                                                            key={ createdAt }
                                                            className={ listItem }
                                                            ref={ messageRef }
                                                        >
                                                            <DialogMessage
                                                                messageText={ message }
                                                                sender={ from }
                                                                date={ createdAt }
                                                                messageStyles={ styles.message }
                                                            />
                                                        </li>
                                                    ))
                                                }
                                            </ul>
            }
        </div>
    )
}

DialogWindow.propTypes = {
    windwowStyles: PropTypes.string,
    listItemStyles: PropTypes.string
}

export default DialogWindow;