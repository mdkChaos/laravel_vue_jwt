import axios from "axios";

const api = axios.create();

api.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

const setupInterceptors = (router) => {
    api.interceptors.response.use({}, async error => {
        const originalRequest = error.config;
        if (error.response.data.message === 'Token has expired' && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.post('/api/auth/refresh', {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                localStorage.setItem('access_token', res.data.access_token);
                api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
                originalRequest.headers['Authorization'] = `Bearer ${res.data.access_token}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                localStorage.removeItem('access_token');
                router.push({name: 'user.login'});
            }
        }
        if (error.response.status === 401) {
            localStorage.removeItem('access_token');
            router.push({name: 'user.login'});
        }
        return Promise.reject(error);
    });
};

export {api, setupInterceptors};
