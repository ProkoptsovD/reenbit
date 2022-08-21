import { useGoogleLogin  } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { userActions } from 'redux/user/userSlice';
import { ReactComponent as GoogleIcon } from '../../assets/icons/google-g-2015.svg';
import styles from './GoogleLoginButton.module.scss';

const GoogleLoginButton = ({ buttonStyles = '' }) => {
    const dispatch = useDispatch();
    const login = useGoogleLogin({
        onSuccess: ({ access_token }) => dispatch(userActions.setUserCredentials(access_token)),
        onError: error => toast.error(error?.error_description)
    });
    
    // styles
    const buttonCss = `icon_button ${styles.button} ${buttonStyles}`;

    return (
        <button
            type="button"
            onClick={() => login()}
            className={ buttonCss }
        >
            <GoogleIcon /> Sign in with Google
        </button>
    )
}

export default GoogleLoginButton;