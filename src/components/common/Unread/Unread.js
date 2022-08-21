import PropTypes from 'prop-types';
import styles from './Unread.module.scss';
import { ReactComponent as BellIcon } from '../../../assets/icons/bell.svg';

const Unread = ({
    number,
    numberStyles = '',
    wrapperStyles = '',
    iconStyles = '',
    ...restProps }) => {
    
    // styles
    const unreadCss = `${styles.unread} ${numberStyles}`;
    const wrapperCss = `${styles.wrapper} ${wrapperStyles}`;
    const iconCss = `${styles.icon} ${iconStyles}`;

    return (
        <div className={ wrapperCss }>
            <BellIcon className={ iconCss } />
            <span
                className={unreadCss }
                { ...restProps }
            >
                { number }
            </span>
        </div>
    )
}

Unread.propTypes = {
    number: PropTypes.number,
    numberStyles: PropTypes.string,
    wrapperStyles: PropTypes.string,
    iconStyles: PropTypes.string
}

export default Unread;