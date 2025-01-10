import axios from 'axios';

const api = axios.create({
    baseURL: 'http://api.test.com',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;