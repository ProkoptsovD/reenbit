import axios from 'axios';

const bassUrl = 'https://api.chucknorris.io/jokes';
axios.defaults.baseURL = bassUrl;

const getChucksResponse = async () => {
    try {
        const response = await axios.get('/random');
        const joke = await response.data.value;
        return joke;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const getChucksResponseWithDelay = (delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const response = getChucksResponse();
            return resolve(response);
        }, delay)
    })
}

export const chuckNorrisApi = {
    getChucksResponse,
    getChucksResponseWithDelay
}