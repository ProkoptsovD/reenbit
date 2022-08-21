import PropTypes from 'prop-types';
import styles from './Container.module.scss';

const Container = ({ children, className, ...restProps }) => {
    return (
        <div
            className={`${styles.container} ${className}` }
            { ...restProps }
        >
            { children }
        </div>
    )
}

Container.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
}

export default Container;