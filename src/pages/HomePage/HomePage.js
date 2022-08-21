import Avatar from "../../components/common/Avatar";
import FilterBar from "../../components/FilterBar";
import Header from "../../components/Header";
import headerStyles from '../../components/Header/Header.module.scss';
import homePageStyles from './HomePage.module.scss';
import Section from "../../components/common/Section";
import ChatList from "../../components/ChatList";
import DialogPanel from "../../components/DialogPanel";
import { useSelector } from "react-redux";
import { userSelectors } from "redux/user/userSelectors";

const HomePage = () => {
    const user = useSelector(userSelectors.getUser);
    //styles
    const avatarCss = `${headerStyles.avatar} ${homePageStyles.avatar}`;

    const openUserProfile = () => {
        console.log('clicked');
    }

    return (
        <div className={ homePageStyles.wrapper }>
            <div className={ homePageStyles.inner_wrapper_1 }>
                <Header>
                    <Avatar
                        userName={ user?.name }
                        stylesWrapper={ avatarCss }
                        isOnline={ user?.isOnline }
                        onClick={ openUserProfile }
                    />
                    <FilterBar placeholder="Search or start new chat"/>
                </Header>
                <Section
                    title="Chats"
                    sectionStyles={ homePageStyles.section }
                    titleStyles={ homePageStyles.section_title }
                    containerStyles={ homePageStyles.section_container }
                >
                    <ChatList />
                </Section>
            </div>
            <div className={ homePageStyles.inner_wrapper_2 }>
                <DialogPanel />
            </div>
        </div>
    )
}

export default HomePage;