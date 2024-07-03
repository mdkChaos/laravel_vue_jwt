<template>
    <div>
        <nav class="nav mb-3">
            <router-link class="btn btn-outline-primary me-3" :to="{ name: 'fruit.index' }">List
            </router-link>
            <router-link v-if="accessToken" class="btn btn-outline-primary me-3" :to="{ name: 'user.personal' }">
                Personal
            </router-link>
            <router-link v-if="!accessToken" class="btn btn-outline-primary me-3" :to="{ name: 'user.login' }">Login
            </router-link>
            <router-link v-if="!accessToken" class="btn btn-outline-primary me-3"
                         :to="{ name: 'user.registration' }">Registeration
            </router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default {
    name: "Index",

    setup() {
        const accessToken = ref('');
        const route = useRoute();

        const getToken = () => {
            accessToken.value = localStorage.getItem('access_token');
        }

        onMounted(() => {
            getToken();
        });

        watch(() => route.name, (newRoute, oldRoute) => {
            getToken();
        });

        return { accessToken };
    }
}
</script>


<style scoped></style>
