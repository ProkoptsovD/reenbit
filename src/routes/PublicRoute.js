import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { userSelectors } from 'redux/user/userSelectors';
import { ROUTES } from "constants";

const defaultNavigate = ROUTES.HOME;

export const PublicRoute = ({ children, restricted, navigateTo = defaultNavigate }) => {
    const user = useSelector(userSelectors.getUser);
    const shouldRedirect = user?.token && restricted;

    return (
        shouldRedirect ? <Navigate to={ navigateTo } replace={ true } /> : children
    )
}

PublicRoute.propTypes = {
    children: PropTypes.any,
    navigateTo: PropTypes.string,
    restricted: PropTypes.bool
}