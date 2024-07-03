import {createRouter, createWebHistory} from 'vue-router';

// Функція для динамічного імпорту з обробкою помилок
const loadComponent = (path) => {
    return () => import(`${path}`).catch(error => {
        console.error('Failed to load the component:', error);
    });
};

const routes = [
    {
        path: '/fruits',
        name: 'fruit.index',
        component: loadComponent('./components/Fruit/index.vue'),
        meta: {requiresAuth: true} // Додаємо meta поле
    },
    {
        path: '/users/login',
        name: 'user.login',
        component: loadComponent('./components/User/Login.vue'),
    },
    {
        path: '/users/registration',
        name: 'user.registration',
        component: loadComponent('./components/User/Registration.vue'),
    },
    {
        path: '/users/personal',
        name: 'user.personal',
        component: loadComponent('./components/User/Personal.vue'),
        meta: {requiresAuth: true} // Додаємо meta поле
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: loadComponent('./components/Error/404.vue'), // Додаємо компонент для 404
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        if (to.name === 'user.login' || to.name === 'user.registration') {
            return next();
        } else {
            return next({name: 'user.login'});
        }
    }

    if ((to.name === 'user.login' || to.name === 'user.registration') && accessToken) {
        if (to.name !== 'user.personal') {
            return next({name: 'user.personal'});
        }
    }

    next();
});

export default router;
