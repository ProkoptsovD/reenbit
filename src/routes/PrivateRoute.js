import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { userSelectors } from 'redux/user/userSelectors';
import { ROUTES } from "constants";


const defaultNavigate = `/${ROUTES.LOGIN}`

export const PrivateRoute = ({ children, navigateTo = defaultNavigate }) => {
    const user = useSelector(userSelectors.getUser);

    return (
        user?.token ? children : <Navigate to={ navigateTo } replace={true} />
    )
}

PrivateRoute.propTypes = {
    children: PropTypes.any,
    navigateTo: PropTypes.string
}