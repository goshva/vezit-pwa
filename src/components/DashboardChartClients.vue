<template>
    <div class="content">
        <div class="row">
            <div class="col-lg-12">
                <BaseBlock title="Рекламодатели">
                    <template #content>
                        <div class="block-content p-0 text-center overflow-hidden">
                            <div class="row">
                                <div class="col-lg-6 center">
                                    <ChartBlock :data="computedEarningsData" :options="earningsOptions" />
                                </div>
                            </div>
                        </div>
                    </template>
                </BaseBlock>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted, ref, computed } from 'vue';
import BaseBlock from '@/components/BaseBlock.vue';
import ChartBlock from '@/components/ChartBlock.vue';
import axiosInstance from '@/services/axios.js';
import { generateColor } from '@/services/genColor.js';

// Static chart options for earnings
const earningsOptions = reactive({
    responsive: true,
    plugins: {
        tooltip: {
            callbacks: {
                label: function (context) {
                    return ' $' + context.raw;
                },
            },
        },
        legend: {
            position: 'top',
        },
    },
});

const clients = ref([]);

// Fetch client data
const fetchClientFinanceSummary = async () => {
    try {
        const response = await axiosInstance.get('/client-finance-summary');
        clients.value = response.data;
    } catch (error) {
        console.error('Error fetching client data:', error);
    }
};

// Helper function to generate random color


// Computed property to use usernames as labels and total_amount as data
const computedEarningsData = computed(() => {
    const labels = clients.value.map(client => client.username); // Use username for labels
    const totalAmounts = clients.value.map(client => parseInt(client.total_amount)); // Use total_amount for data
    const backgroundColors = clients.value.map(client => generateColor(client.username)); // Pass username to generateColor

    return {
        labels: labels, // Set usernames as labels
        datasets: [
            {
                label: 'Earnings',
                backgroundColor: backgroundColors, // Set random background colors
                data: totalAmounts, // Set total_amount as data
            },
        ],
    };
});

onMounted(() => {
    fetchClientFinanceSummary();
});
</script>
<style>
.center {
    margin: auto;
}
</style>