import { lazy, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ROUTES } from "constants";
import { PrivateRoute, PublicRoute } from "routes";
import { fakeUsersApi } from "services/fakeUsersApi";
import { friendsActions } from "redux/friends/friendsSlice";
import { toast } from "react-hot-toast";
import { fakeChatApi } from "services/fakeChatApi";
import { chatsActions } from "redux/chats/chatsSlice";
import { hasKeyInStorage } from "utils/hasKeyInStorage";
import { storageKey } from "constants";

const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const needToFetchChats = !hasKeyInStorage(storageKey.whiteListedKeys.chats);
    
    fakeUsersApi.getAllUsers()
        .then(({ users }) => {
            dispatch(friendsActions.setFriends(users))
        })
        .catch(error => toast.error(error));
    
    if (needToFetchChats) {
      fakeChatApi.getAllChats()
        .then(({ chats }) => {
            dispatch(chatsActions.setChats(chats))
        })
        .catch(error => toast.error(error));
    }

}, [dispatch]);


  // protected & public routes
  const Home = <PrivateRoute>{ <HomePage /> }</PrivateRoute>;
  const Login = <PublicRoute restricted navigateTo={ ROUTES.HOME } >{ <LoginPage /> }</PublicRoute>;
  const Register = <PublicRoute restricted navigateTo={ ROUTES.HOME }>{ <RegisterPage /> }</PublicRoute>;

  return (
    <>
      <Routes>
        <Route path={ ROUTES.HOME } element={ Home } />
        <Route path={ '/' + ROUTES.REGISTER } element={ Register } />
        <Route path={ '/' + ROUTES.LOGIN } element={ Login } />
        <Route path={ ROUTES.WILD } element={ <NotFoundPage /> }/>
      </Routes>

      <div><Toaster/></div>
    </>
  );
};
