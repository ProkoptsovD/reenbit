import axios from "axios";

const jezzarah = axios.create({
    baseURL: 'https://jezzarah.com/auth',
    headers: {
        'Content-Type': 'application/json'
    }
});

const createUser = (credentials) => jezzarah.post('/register', credentials);

const loginUser = (credentials) => jezzarah.post('/login', credentials);

export const authApi = {
    createUser,
    loginUser
};

// POST https://jezzarah.com/auth/register
// Content-Type: application/json

// register schema {
//     "firstName": "Bob",
//     "lastName" : "Marley",
//     "email": "aaa@a.com",
//     "password": "bbb"
// }

// POST https://jezzarah.com/auth/login
// Content-Type: application/json

// login schema
// {
//   "email": "aaa@a.com",
//   "password": "bb"
// }