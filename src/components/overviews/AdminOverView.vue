<template>
  <div class="row items-push">
    <BaseBlockOwerView
      v-for="(block, index) in blocks"
      :key="index"
      :block="block"
      :statuses="statuses[block.sourceCount]"
    />
  </div>
</template>

<script setup>
import { ref, onMounted,  computed } from 'vue';
import BaseBlockOwerView from "@/components/overviews/BaseBlockOwerView.vue"
import axiosInstance from '@/services/axios.js';

const loading = ref(false);
const statuses = ref([]);
const fetchEquipments = async () => {
    loading.value = true;
    try {
        const response = await axiosInstance.get('/common-status-counts');
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


onMounted(() => {
        fetchEquipments();
});

const blocks = [
  {
    title: "Список актуальных реклам",
    icon: "fa-gem",
    link: "/admin/ads",
    sourceCount: "video",
  },
  {
    title: "Список оборудования",
    icon: "fa-paper-plane",
    link: "/admin/eq",
    sourceCount: "equipment",

  },
  {
    title: "Клиенты",
    icon: "fa-chart-bar",
    link: "/admin/cli",
    sourceCount: "client",
  },
  {
    title: "Список системных ошибок",
    icon: "fa-chart-bar",
    link: "/admin/error",
    sourceCount: "cfgupdate",
  },
  {
    title: "Изменение настроек оборудования",
    icon: "fa-chart-bar",
    link: "/admin/settings",
    sourceCount: "cfgupdate-log",
  },
  {
    title: "Контроль пользователей",
    icon: "fa-chart-bar",
    link: "/admin/control",
    sourceCount: "user",
  },
  {
    title: "Документы",
    icon: "fa-chart-bar",
    link: "/admin/doc",
    sourceCount: "doc",
  },
  {
    title: "Техподдержка",
    icon: "fa-chart-bar",
    link: "/admin/support",
    sourceCount: "message",
  }
];
</script>
