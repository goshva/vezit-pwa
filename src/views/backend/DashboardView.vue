<template>
  <!-- Page Content -->
  <DashboardCharts/>
  <!-- END Page Content -->
</template>

<script setup>
import { reactive } from 'vue';
import DashboardCharts from '@/components/DashboardCharts.vue';
import { Pie } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

// Set Global Chart.js configuration
Chart.defaults.color = '#818d96';
Chart.defaults.scale.display = false;
Chart.defaults.plugins.legend.labels.boxWidth = 12;

// Pie Chart Earnings Data
const earningsData = reactive({
  labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  datasets: [
    {
      label: 'Earnings',
      backgroundColor: ['rgba(132, 94, 247, 0.3)', 'rgba(33, 37, 41, 0.15)', 'rgba(255, 159, 64, 0.3)', 'rgba(75, 192, 192, 0.3)', 'rgba(153, 102, 255, 0.3)', 'rgba(255, 99, 132, 0.3)'],
      data: [2150, 1350, 1560, 980, 1260, 1720, 1115, 1690, 1870, 2420, 2100, 2730],
    },
  ],
});

// Pie Chart Earnings Options
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

// Pie Chart Sales Data
const salesData = reactive({
  labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  datasets: [
    {
      label: 'Sales',
      backgroundColor: ['rgba(34, 184, 207, 0.3)', 'rgba(255, 206, 86, 0.3)', 'rgba(153, 102, 255, 0.3)', 'rgba(75, 192, 192, 0.3)', 'rgba(255, 99, 132, 0.3)', 'rgba(255, 159, 64, 0.3)'],
      data: [175, 120, 169, 82, 135, 169, 132, 130, 192, 230, 215, 260],
    },
  ],
});

// Pie Chart Sales Options
const salesOptions = reactive({
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          return context.raw + ' Sales';
        },
      },
    },
    legend: {
      position: 'top',
    },
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
