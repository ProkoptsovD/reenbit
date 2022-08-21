import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import InputWithLabel from 'components/common/InputWithLabel';
import styles from './AuthForm.module.scss';
import GoogleLoginButton from 'components/GoogleLoginButton';
import { ROUTES } from 'constants';
import { authApi } from 'services/authApi';
import { useDispatch } from 'react-redux';
import { userActions } from 'redux/user/userSlice';

const AuthForm = ({
    isRegisterForm,
    formStyles = '',
    inputStyles = '',
    inputWrapperStyles = '',
    labelStyles = '',
    buttonStyles = ''
}) => {
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const dispatch = useDispatch();

    // styles
    const formCss = `${styles.form} ${formStyles}`;
    const inputCss = `input ${styles.auth_input} ${inputStyles}`;
    const inputWrapperCss = `${styles.input_wrapper} ${inputWrapperStyles}`;
    const labelCss = `${styles.label} ${labelStyles}`;
    const buttonCss = `text_button ${styles.button} ${buttonStyles}`;
    
    const reset = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }
    const handleResponse = ({ data }) => {
        reset();
        dispatch(userActions.setUserCredentials(data.token));
    };
    const handleError = ({ message }) => toast.warning(message);
    const handleSubmit = (e) => {
        e.preventDefault();

        const userCredentials = isRegisterForm
            ? { firstName, lastName, email, password }
            : { email, password }    
        if(isRegisterForm) {
            authApi.createUser(userCredentials)
                .then(handleResponse)
                .catch(handleError);
        } else {
            authApi.loginUser(userCredentials)
                .then(handleResponse)
                .catch(handleError)
        }
    }

    return (
        <form
            onSubmit={ handleSubmit }
            className={ formCss }
        >
            {
                isRegisterForm &&   <>
                                        <InputWithLabel
                                            id="firstName"
                                            name="firstName"
                                            label="First name"
                                            value={ firstName }
                                            onChange={(e) => setFirstName(e.target.value)}
                                            inputStyles={ inputCss }
                                            wrapperStyles={ inputWrapperCss }
                                            labelStyles={ labelCss }
                                            required
                                        />
                                        <InputWithLabel
                                            id="lastName"
                                            name="lastName"
                                            label="Last name"
                                            value={ lastName }
                                            onChange={(e) => setLastName(e.target.value)}
                                            inputStyles={ inputCss }
                                            wrapperStyles={ inputWrapperCss }
                                            labelStyles={ labelCss }
                                            required
                                        />
                                    </>
            }
            <InputWithLabel
                id="email"
                name="email"
                label="Email"
                value={ email }
                onChange={(e) => setEmail(e.target.value)}
                inputStyles={ inputCss }
                wrapperStyles={ inputWrapperCss }
                labelStyles={ labelCss }
                required
            />
            <InputWithLabel
                id="password"
                name="password"
                label="Password"
                value={ password }
                onChange={(e) => setPassword(e.target.value)}
                inputStyles={ inputCss }
                wrapperStyles={ inputWrapperCss }
                labelStyles={ labelCss }
                required
            />
            <button
                type="submit"
                className={ buttonCss }
            >
                { isRegisterForm ? 'Sign Up' : 'Log In'}
            </button>
            {
                !isRegisterForm &&  <>
                                        <span className={ styles.or }>or</span>
                                        <GoogleLoginButton />
                                        <div
                                            className={ styles.tip }
                                        >
                                            Don't have an account? Register&nbsp;
                                            <Link to={ '/' + ROUTES.REGISTER }>here</Link>
                                        </div>
                                    </>
            }
        </form>
    )
}

AuthForm.propTypes = {
    isRegisterForm: PropTypes.bool,
    formStyles: PropTypes.string,
    inputStyles: PropTypes.string,
    inputWrapperStyles: PropTypes.string,
    labelStyles: PropTypes.string
}

export default AuthForm;