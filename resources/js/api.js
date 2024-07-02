import axios from "axios";

const api = axios.create();

api.interceptors.request.use(config => {
    if (localStorage.getItem('access_token')) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    }
    return config;
}, error => {
    console.error('Error in request:', error);
    return Promise.reject(error);
});

const setupInterceptors = (router) => {
    api.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response && error.response.status === 401) {
            router.push({ name: 'user.login' });
        }
        return Promise.reject(error);
    });
};

export { api, setupInterceptors };
