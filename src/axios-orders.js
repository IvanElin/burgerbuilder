import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-51433.firebaseio.com/'
});

export default instance;