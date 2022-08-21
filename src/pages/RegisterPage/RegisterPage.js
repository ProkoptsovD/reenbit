import Container from "components/common/Container";
import AuthForm from "components/AuthForm";

const RegisterPage = () => {
    return (
        <Container className='page_container'>
            <h1
                className='page_title'
            >
                Create account
            </h1>
            <AuthForm isRegisterForm />
        </Container>
    )
}

export default RegisterPage;