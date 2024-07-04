<template>
    <div class="col-3">
        <form @submit.prevent="store">
            <div class="mb-3">
                <input v-model="name" type="text" class="form-control" placeholder="Name" required>
                <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
            </div>
            <div class="mb-3">
                <input v-model="email" type="email" class="form-control" placeholder="E-Mail" required>
                <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>
            <div class="mb-3">
                <input v-model="password" type="password" class="form-control" placeholder="Password" required>
                <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
            <div class="mb-3">
                <input v-model="password_confirmation" type="password" class="form-control"
                       placeholder="Confirm Password" required>
                <div v-if="errors.password_confirmation" class="text-danger">{{ errors.password_confirmation }}</div>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
                <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                Register
            </button>
            <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
            <div v-if="success" class="alert alert-success mt-3">{{ success }}</div>
        </form>
    </div>
</template>

<script>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import axios from 'axios'; // Ensure axios is imported

export default {
    name: "Registration",

    setup() {
        const name = ref('');
        const email = ref('');
        const password = ref('');
        const password_confirmation = ref('');
        const errors = ref({});
        const isLoading = ref(false);
        const error = ref('');
        const success = ref('');
        const router = useRouter();

        const store = () => {
            isLoading.value = true;
            axios.post('/api/users', {
                name: name.value,
                email: email.value,
                password: password.value,
                password_confirmation: password_confirmation.value
            })
                .then(response => {
                    localStorage.setItem('access_token', response.data.access_token);
                    success.value = 'Register new user successful! Redirecting...';
                    name.value = '';
                    email.value = '';
                    password.value = '';
                    password_confirmation.value = '';
                    errors.value = {};
                    error.value = '';
                    setTimeout(() => {
                        router.push({name: 'user.personal'});
                    }, 1000);
                })
                .catch(err => {
                    if (err.response) {
                        if (err.response.status === 422) {
                            errors.value = err.response.data.errors;
                        } else {
                            error.value = `Server Error: ${err.response.status} ${err.response.data.message}`;
                            console.log(err.response.data);
                        }
                    } else {
                        error.value = `Error: ${err.message}`;
                    }
                })
                .finally(() => {
                    isLoading.value = false;
                });
        };

        return {
            name,
            email,
            password,
            password_confirmation,
            errors,
            isLoading,
            success,
            error,
            store,
        };
    },
}
</script>

<style scoped>
</style>
