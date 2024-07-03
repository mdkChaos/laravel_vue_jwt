<template>
    <div class="table-responsive">
        <table class="table table-striped table-hover">
            <thead class="table-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="fruit in fruits" :key="fruit.id">
                <th scope="row">{{ fruit.id }}</th>
                <td>{{ fruit.name }}</td>
                <td>{{ fruit.price }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import {api, setupInterceptors} from "../../api.js";
import {useRouter} from 'vue-router';

export default {
    name: "Index",

    setup() {
        const fruits = ref([]);
        const router = useRouter();

        setupInterceptors(router);

        const getFruits = async () => {
            try {
                const response = await api.get('/api/auth/fruits');
                fruits.value = response.data.data;
            } catch (error) {
                console.error('Error fetching fruits:', error);
            }
        };

        onMounted(() => {
            getFruits();
        });

        return {
            fruits
        };
    }
};
</script>

<style scoped></style>
