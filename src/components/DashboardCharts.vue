<template>
    <div class="content">
      <div class="row">
        <div class="col-lg-12">
          <BaseBlock title="Рекламодатели и партнеры">
            <template #options>
              <BalanceDisplay :balance="5000" />
            </template>
  
            <template #content>
              <div class="block-content p-0 text-center overflow-hidden">
                <div class="row">
                  <div class="col-lg-6">
                    <ChartBlock :data="earningsData" :options="earningsOptions" />
                  </div>
                  <div class="col-lg-6">
                    <ChartBlock :data="salesData" :options="salesOptions" />
                  </div>
                </div>
              </div>
              <div class="block-content">
                <div class="row items-push text-center py-3">
                  <div class="col-6 col-xl-6">
                    <p class="m-0" id="page-header-user-dropdown">
                      Рекламодатели: <strong>5 000</strong> ₽
                    </p>
                    <DateFilter />
                  </div>
                  <div class="col-6 col-xl-6">
                    <p class="m-0" id="page-header-user-dropdown">
                      Партнеры: <strong>5 000</strong> ₽
                    </p>
                    <DateFilter />
                  </div>
                </div>
              </div>
            </template>
          </BaseBlock>
        </div>
      </div>
      <AdminOverview />
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  import BalanceDisplay from '@/components/BalanceDisplay.vue';
  import ChartBlock from '@/components/ChartBlock.vue';
  import DateFilter from '@/components/DateFilter.vue';
  import AdminOverview from '@/components/overviews/AdminOverView.vue';
  
  const earningsData = reactive({
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    datasets: [
      {
        label: 'Earnings',
        backgroundColor: [
          'rgba(132, 94, 247, 0.3)',
          'rgba(33, 37, 41, 0.15)',
          'rgba(255, 159, 64, 0.3)',
          'rgba(75, 192, 192, 0.3)',
          'rgba(153, 102, 255, 0.3)',
          'rgba(255, 99, 132, 0.3)',
        ],
        data: [2150, 1350, 1560, 980, 1260, 1720, 1115, 1690, 1870, 2420, 2100, 2730],
      },
    ],
  });
  
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
  
  const salesData = reactive({
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    datasets: [
      {
        label: 'Sales',
        backgroundColor: [
          'rgba(34, 184, 207, 0.3)',
          'rgba(255, 206, 86, 0.3)',
          'rgba(153, 102, 255, 0.3)',
          'rgba(75, 192, 192, 0.3)',
          'rgba(255, 99, 132, 0.3)',
          'rgba(255, 159, 64, 0.3)',
        ],
        data: [175, 120, 169, 82, 135, 169, 132, 130, 192, 230, 215, 260],
      },
    ],
  });
  
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
  