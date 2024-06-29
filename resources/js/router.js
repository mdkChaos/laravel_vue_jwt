import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/fruits',
        name: 'fruit.index',
        component: () => import('./components/Fruit/index.vue').catch(error => {
            console.error('Failed to load the component:', error);
        }),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;