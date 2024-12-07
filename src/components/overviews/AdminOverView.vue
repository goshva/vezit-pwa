<template>
  <div class="row items-push">
    <BaseBlockOwerView
      v-for="(block, index) in blocks"
      :key="index"
      :block="block"
      :statuses="getStatusesForBlock(block.sourceCount)"
    />
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
        const response = await axiosInstance.get('/admin-status-counts');
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
    title: "Список актуальных реклам",
    icon: "fa-gem",
    link: "/video",
    sourceCount: "videos",
  },
  {
    title: "Список оборудования",
    icon: "fa-paper-plane",
    link: "/eq",
    sourceCount: "equipments",
  },
  {
    title: "Клиенты",
    icon: "fa-chart-bar",
    link: "/cli",
    sourceCount: "clients",
  },
  {
    title: "Автомобили",
    icon: "fa-chart-bar",
    link: "/cars",
    sourceCount: "partnerscars",
  },
  {
    title: "Список системных ошибок",
    icon: "fa-chart-bar",
    link: "/error",
    sourceCount: "cfgupdates",
  },
  {
    title: "Изменение настроек оборудования",
    icon: "fa-chart-bar",
    link: "/settings",
    sourceCount: "cfgupdate_log",
  },
  {
    title: "Контроль пользователей",
    icon: "fa-chart-bar",
    link: "/control",
    sourceCount: "users",
  },
  {
    title: "Документы",
    icon: "fa-chart-bar",
    link: "/doc",
    sourceCount: "docs",
  },
  {
    title: "Техподдержка",
    icon: "fa-chart-bar",
    link: "/tiketsupport",
    sourceCount: "tiketssupport",
  }
];
</script>
