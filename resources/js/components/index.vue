<template>
    <div>
        <nav class="nav mb-3">
            <router-link class="btn btn-outline-primary me-3" :to="{ name: 'fruit.index' }">List</router-link>
            <router-link class="btn btn-outline-primary me-3" :to="{ name: 'user.personal' }">Personal</router-link>
            <router-link class="btn btn-outline-primary me-3" :to="{ name: 'user.login' }">Login</router-link>
            <router-link class="btn btn-outline-primary me-3"
                :to="{ name: 'user.registration' }">Registeration</router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "Index"
}
</script>

<style scoped></style>
