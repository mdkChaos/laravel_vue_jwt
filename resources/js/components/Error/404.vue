<template>
    <div class="container text-center mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h1 class="display-1">404</h1>
                <h2 class="mb-4">Page Not Found</h2>
                <p class="lead">The page you are looking for does not exist.</p>
                <router-link class="btn btn-outline-primary me-3" :to="{ name: 'user.personal' }">Go to Home</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style scoped>
/* Додаємо додаткові стилі за потреби
.container {
    min-height: 100vh;
    display: flex;
    align-items: center;
} */
</style>
