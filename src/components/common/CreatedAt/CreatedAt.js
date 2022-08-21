import PropTypes from 'prop-types';
import moment from "moment";
import styles from './CreatedAt.module.scss';

const preciseFormat = 'MM/DD/YYYY, HH:mm A';
const defaultFormat = 'll';

const CreatedAt = ({
    date,
    precise,
    textStyles = '',
    timeStyles = ''
}) => {
    const format = precise ? preciseFormat : defaultFormat;
    const formatedDate = moment(date).format(format);
    const text = `${styles.date_time_text} ${textStyles}`;
    
    return (
        <p className={ text }>
            <time
                dateTime={ formatedDate }
                className={ timeStyles }
            >
                { formatedDate }
            </time>
        </p>
    )
}

CreatedAt.propTypes = {
    date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    precise: PropTypes.bool
}

export default CreatedAt;