import PropTypes from 'prop-types';
import styles from './Avatar.module.scss'
import { avatarFallback } from 'constants';

const Avatar = ({
    url, userName, isOnline,
    className = '', stylesWrapper = '',
    dialogMode, onClick, ...restProps
}) => {
    //styles
    const onlineStatus = isOnline ? styles.isOnline : styles.isOffline;
    const cssStyles = dialogMode ? '' : styles.displayStatus + ' ' + onlineStatus;
    const wrapperCss = `${styles.wrapper} ${cssStyles} ${stylesWrapper}`;
    const imageCss = `${styles.avatar} ${className}`;

    return (
        <div
            className={ wrapperCss }
            onClick={ onClick }
        >
            <div className={ styles.inner_wrapper }>
                <img
                    src={ url ?? avatarFallback }
                    alt={ userName }
                    className={ imageCss }
                    { ...restProps }
                />
            </div>
        </div>
    )
}

Avatar.propTypes = {
    url: PropTypes.string,
    userName: PropTypes.string,
    isOnline: PropTypes.bool,
    className: PropTypes.string,
    stylesWrapper: PropTypes.string,
    onClick: PropTypes.func
}

export default Avatar;