<template>
    <div class="col-3">
        <input v-model="name" type="text" class="form-control mb-3" placeholder="Name">
        <input v-model="email" type="email" class="form-control mb-3" placeholder="E-Mail">
        <input v-model="password" type="password" class="form-control mb-3" placeholder="Password">
        <input v-model="password_confirmation" type="password" class="form-control mb-3" placeholder="Confirm password">
        <input @click.prevent="store" type="submit" value="Register" class="btn btn-primary mb-3">
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: "Registration",

    setup() {
        const name = ref('');
        const email = ref('');
        const password = ref('');
        const password_confirmation = ref('');

        const store = () => {
            axios.post('/api/users', {
                name: name.value,
                email: email.value,
                password: password.value,
                password_confirmation: password_confirmation.value
            })
                .then(response => {
                    // Обробка успішної відповіді
                    console.log(response.data);
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status === 422) {
                            console.error('Validation Errors:', error.response.data.errors);
                        } else {
                            console.error('Server Error:', error.response.status, error.response.data);
                        }
                    } else {
                        console.error('Error:', error.message);
                    }
                });


        };

        return {
            name,
            email,
            password,
            password_confirmation,
            store,
        };
    },
}
</script>

<style scoped></style>
