import { users as fakeUsersData } from "constants";

const getAllUsers = () => Promise.resolve(fakeUsersData);

export const fakeUsersApi = {
    getAllUsers
}