import Container from "components/common/Container";
import AuthForm from "components/AuthForm";

const LoginPage = () => {
    return (
        <Container className='page_container'>
            <h1
                className='page_title'
            >
                Please login
            </h1>
            <AuthForm />
        </Container>
    )
}

export default LoginPage;