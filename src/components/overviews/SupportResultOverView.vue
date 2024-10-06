<template>
  <div class="row items-push">
    <BaseBlockOwerView v-for="(block, index) in blocks" :key="index" :block="block"
      :statuses="getStatusesForBlock(block.sourceCount)" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import BaseBlockOwerView from "@/components/overviews/BaseBlockOwerView.vue";
import axiosInstance from '@/services/axios.js';

const loading = ref(false);
const statuses = ref({});
const fetchEquipments = async () => {
  loading.value = true;
  try {
    const response = await axiosInstance.get('/support-results');
    statuses.value = response.data; // Assuming response data matches the new JSON format
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
};

// Helper function to get the correct statuses for each block
const getStatusesForBlock = (sourceCount) => {
  return statuses.value[sourceCount] || {
    status_0: null,
    status_1: null,
    status_2: null,
    status_3: null,
    status_4: null,
    status_5: null
  };
};

// Computed property to calculate the sum of all status values
const statusSum = computed(() => {
  return Object.values(statuses.value).reduce((sum, statusObj) => {
    const values = Object.values(statusObj).filter(val => val !== null);
    return sum + values.reduce((subSum, value) => subSum + Number(value || 0), 0);
  }, 0);
});

onMounted(() => {
  fetchEquipments();
});

const blocks = [
  {
    title: "Ожидают проверки",
    icon: "fa-gem",
    link: "/admin/ads",
    sourceCount: "videos",
  },
  {
    title: "Проверено",
    icon: "fa-chart-bar",
    link: "/admin/control",
    sourceCount: "users",
  },
  {
    title: "Принято",
    icon: "fa-paper-plane",
    link: "/admin/eq",
    sourceCount: "equipments",
  },
  {
    title: "Отклонены",
    icon: "fa-chart-bar",
    link: "/admin/support",
    sourceCount: "messages",
  }
];
</script>
