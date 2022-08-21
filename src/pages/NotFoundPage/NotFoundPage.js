import { useLocation } from "react-router-dom";
import { ROUTES } from "constants";
import Container from "components/common/Container";
import BackLink from "components/common/BackLink";
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
    const location = useLocation();
    const backLinkHref = location?.state?.from ?? ROUTES.HOME;

    return (
        <Container className="page_container">
            <h1 className="page_title">
                The page does't exist!
            </h1>
            <BackLink
                text="Go back"
                to={ backLinkHref }
                className={ styles.back_link }
            />
        </Container>
    )
}

export default NotFoundPage;