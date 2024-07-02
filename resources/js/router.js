import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/fruits',
        name: 'fruit.index',
        component: () => import('./components/Fruit/index.vue').catch(error => {
            console.error('Failed to load the component:', error);
        }),
    },
    {
        path: '/users/login',
        name: 'user.login',
        component: () => import('./components/User/Login.vue').catch(error => {
            console.error('Failed to load the component:', error);
        }),
    },
    {
        path: '/users/registration',
        name: 'user.registration',
        component: () => import('./components/User/Registration.vue').catch(error => {
            console.error('Failed to load the component:', error);
        }),
    },
    {
        path: '/users/personal',
        name: 'user.personal',
        component: () => import('./components/User/Personal.vue').catch(error => {
            console.error('Failed to load the component:', error);
        }),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
