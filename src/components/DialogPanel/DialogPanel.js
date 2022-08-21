import { useSelector } from "react-redux";
import { friendsSelectors } from "redux/friends/friendsSelectors";

import DialogWindow from "components/DialogWindow";
import Friend from "components/Friend";
import SendMessageBox from "components/SendMessageBox";
import styles from './DialogPanel.module.scss';

const DialogPanel = () => {
    const friend = useSelector(friendsSelectors.getSelectedFriendProfile);

    return (
        <div className={ styles.dialog_panel }>
            <div className={ styles.subheader }>
                {
                    friend &&   <Friend
                                    dialogMode
                                    nameStyles={ styles.friend_name }
                                    { ...friend }
                                />
                }
            </div>
            <DialogWindow />
            <SendMessageBox
                placeholder="Type your message"
            />
        </div>
    )
}

export default DialogPanel;