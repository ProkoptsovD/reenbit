const getUser = (state) => state.user;
const getToken = (state) => state.user.token;

export const userSelectors = {
    getUser,
    getToken
}
