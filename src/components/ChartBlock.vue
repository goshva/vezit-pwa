<template>
    <div class="pt-3 m-n1">
      <Pie :data="data" :options="options" style="height: 350px; margin: auto;" />
    </div>
  </template>
  
  <script setup>
  import { Pie } from 'vue-chartjs';
  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
  </style>
  