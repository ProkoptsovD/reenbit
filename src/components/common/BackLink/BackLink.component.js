import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BackLink = ({ to, text, className }) => {
    const backLinkCss = `text_button ${className}`;
    
    return (
        <Link
            to={to}
            className={ backLinkCss }
        >
            { text }
        </Link>
    );
};

BackLink.propTypes = {
    to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    text: PropTypes.string,
    className: PropTypes.string
}

export default BackLink;