<template>
    <div class="col-sm-6 col-xxl-3">
        <BaseBlock class="d-flex flex-column h-100 mb-0">
            <template #content>
                <div
                    class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center">
                    <dl class="mb-0">
                        <!-- Display all statuses followed by the sum and the block count -->
                        <dt class="fs-3 fw-bold">
                            <span v-for="(status, index) in statuses" :key="index" class="fs-3 fw-bold">
                                {{ status }} 
                                <span v-if="status.index  !== null"> / </span>
                            </span>
                            <div v-if="loading">
                                
                                <i class="fas fa-spinner fa-spin"></i>
                            </div>
                            <span v-else>
                                {{ statusSum }}
                            </span>
                        </dt>
                        <dd class="fs-sm fw-medium text-muted mb-0">{{ block.title }}</dd>
                    </dl>
                    <div class="item item-rounded-lg bg-body-light">
                        <i :class="`fa ${block.icon} fs-3 text-primary`"></i>
                    </div>
                </div>
                <div class="bg-body-light rounded-bottom">
                    <RouterLink
                        class="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between"
                        :to="block.link">
                        <span>Подробнее...</span>
                        <i class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"></i>
                    </RouterLink>
                </div>
            </template>
        </BaseBlock>
    </div>
</template>

<script setup>
import { defineProps, ref, onMounted, watch, computed } from 'vue';
import axiosInstance from '@/services/axios.js';

const loading = ref(false);
const statuses = ref([]);

const props = defineProps({
    block: {
        type: Object,
        required: true
    }
});

// Function to fetch equipment status
const fetchEquipments = async (apiUrl) => {
    loading.value = true;
    try {
        const response = await axiosInstance.get(apiUrl);
        statuses.value = Object.values(response.data); // Assuming response data is an object with status_0, status_1, etc.
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        loading.value = false;
    }
};

// Computed property to calculate the sum of all status values
const statusSum = computed(() => {
    return statuses.value.reduce((sum, status) => sum + Number(status), 0);
});

// Watch for block prop change and fetch data
watch(() => props.block, (newBlock) => {
    if (newBlock && newBlock.apiUrl) {
        fetchEquipments(newBlock.apiUrl);
    }
}, { immediate: true });

onMounted(() => {
    // Fetch data on component mount if block prop is already available
    if (props.block && props.block.apiUrl) {
        fetchEquipments(props.block.apiUrl);
    }
});
</script>