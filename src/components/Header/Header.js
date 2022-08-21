import PropTypes from 'prop-types';
import Container from 'components/common/Container';
import styles from './Header.module.scss';

const Header = ({ children, stylesHeader = '', stylesContainer = '' }) => {
    return (
        <header
            className={ `${styles.header} ${stylesHeader}` }
        >
            <Container
                className={ `${styles.container} ${stylesContainer}` }
            >
                { children }
            </Container>
        </header>
    )
}

Header.propTypes = {
    children: PropTypes.any,
    stylesHeader: PropTypes.string,
    stylesContainer: PropTypes.string,
}

export default Header;