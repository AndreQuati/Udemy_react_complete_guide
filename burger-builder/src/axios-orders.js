import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://udemy-burger-builder-86b9b.firebaseio.com/'
});

export default instance;