<template>
    <div class="col-3">
        <input v-model="email" type="email" class="form-control mb-3" placeholder="E-Mail">
        <input v-model="password" type="password" class="form-control mb-3" placeholder="Password">
        <input @click.prevent="login" type="submit" value="Login" class="btn btn-primary mb-3">
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
        <div v-if="success" class="alert alert-success mt-3">{{ success }}</div>
    </div>
</template>

<script>
import {ref} from "vue";
import {useRouter} from 'vue-router';
import axios from 'axios';

export default {
    name: "Login",

    setup() {
        const email = ref('');
        const password = ref('');
        const error = ref('');
        const success = ref('');
        const router = useRouter();

        const login = async () => {
            error.value = '';
            success.value = '';

            if (!email.value || !password.value) {
                error.value = 'Please fill in both email and password fields.';
                return;
            }

            try {
                const response = await axios.post('/api/auth/login', {
                    email: email.value,
                    password: password.value
                });
                localStorage.setItem('access_token', response.data.access_token);
                success.value = 'Login successful! Redirecting...';
                setTimeout(() => {
                    router.push({name: 'user.personal'});
                }, 1000);
            } catch (err) {
                error.value = 'Login failed. Please check your credentials and try again.';
            }
        }

        return {
            email,
            password,
            login,
            error,
            success
        }
    }
}
</script>

<style scoped></style>
