<template>
    <div class="table-responsive col-6">
        <table class="table table-striped table-hover">
            <thead class="table-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="fruit in fruits">
                    <th scope="row">{{ fruit.id }}</th>
                    <td>{{ fruit.name }}</td>
                    <td>{{ fruit.price }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    name: "Index",

    setup() {
        const fruits = ref(null);

        const getFruits = async () => {
            try {
                const response = await axios.get('/api/fruits');
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
