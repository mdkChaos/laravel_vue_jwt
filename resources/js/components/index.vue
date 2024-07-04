<template>
    <div>
        <nav class="nav mb-3 d-flex justify-content-between align-items-center">
            <div>
                <router-link class="btn btn-outline-primary me-3" :to="{ name: 'fruit.index' }">List</router-link>
                <router-link v-if="accessToken" class="btn btn-outline-primary me-3" :to="{ name: 'user.personal' }">Personal</router-link>
                <router-link v-if="!accessToken" class="btn btn-outline-primary me-3" :to="{ name: 'user.login' }">Login</router-link>
                <router-link v-if="!accessToken" class="btn btn-outline-primary me-3" :to="{ name: 'user.registration' }">Registration</router-link>
            </div>
            <div v-if="accessToken" class="d-flex align-items-center">
                <span class="me-3 fw-bold text-primary">{{ userName }}</span>
                <a href="#" @click.prevent="logout" class="btn btn-outline-danger">Logout</a>
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import {api, setupInterceptors} from "../api.js";

export default {
    name: "Index",

    setup() {
        const accessToken = ref('');
        const userName = ref('');
        const router = useRouter();

        setupInterceptors(router);

        const getToken = () => {
            accessToken.value = localStorage.getItem('access_token');
        };

        const getUserName = async () => {
            if (accessToken.value) {
                try {
                    const response = await api.post('/api/auth/me');
                    userName.value = response.data.name;
                } catch (error) {
                    console.error('Error fetching user name:', error);
                }
            }
        };

        const logout = async () => {
            await api.post('/api/auth/logout')
                .then(() => {
                    localStorage.removeItem('access_token');
                    userName.value = '';
                    router.push({name: 'user.login'});
                });
        };

        onMounted(() => {
            getToken();
            getUserName();
        });

        watch(() => router.currentRoute.value.name, () => {
            getToken();
            getUserName();
        });

        return {
            accessToken,
            userName,
            logout,
        };
    },
}
</script>

<style scoped>
/* You can add scoped styles here if needed */
</style>
