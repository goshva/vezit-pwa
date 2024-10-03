<template>
  <div class="content">
    <div class="row">
      <div class="col-lg-12">
        <BaseBlock title="Панель управления">
          <template #options>
            <BalanceDisplay :balance="clientsTotal - partnersTotal" />
          </template>

          <template #content>
            <div class="block-content p-0 text-center overflow-hidden">
              <div class="row">
                <div class="col-lg-6">
                  <DashboardChartClients/>
                </div>
                <div class="col-lg-6">
                  <DashboardChartPartners/>
                </div>
              </div>
            </div>
            <div class="block-content">
              <div class="row items-push text-center py-3">
                <div class="col-6 col-xl-6">
                  <p class="m-0" id="page-header-user-dropdown">
                    Рекламодатели: <strong>{{ clientsTotal }}</strong> ₽
                  </p>
                  <DateFilter />
                </div>
                <div class="col-6 col-xl-6">
                  <p class="m-0" id="page-header-user-dropdown">
                    Партнеры: <strong>{{ partnersTotal }}</strong> ₽
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
import DashboardChartPartners from '@/components/DashboardChartPartners.vue';
import DashboardChartClients from '@/components/DashboardChartClients.vue';
import { onMounted, ref, computed } from 'vue';
import BalanceDisplay from '@/components/BalanceDisplay.vue';
import DateFilter from '@/components/DateFilter.vue';
import AdminOverview from '@/components/overviews/AdminOverView.vue';
import axiosInstance from '@/services/axios.js';


const loading = ref(false);
const clients = ref([]);
const partners = ref([]);

const fetchPartnerFinanceSummary = async () => {
  loading.value = true;
  try {
    const response = await axiosInstance.get('/partner-finance-summary');
    partners.value = response.data;
  } catch (error) {
    console.error('Error fetching partner data:', error);
  } finally {
    loading.value = false;
  }
};

const fetchClientFinanceSummary = async () => {
  loading.value = true;
  try {
    const response = await axiosInstance.get('/client-finance-summary');
    clients.value = response.data;
  } catch (error) {
    console.error('Error fetching client data:', error);
  } finally {
    loading.value = false;
  }
};

const clientsTotal = computed(() => {
  return clients.value.reduce((total, client) => total + parseInt(client.total_amount), 0);
});

const partnersTotal = computed(() => {
  return partners.value.reduce((total, partner) => total + parseInt(partner.total_amount), 0);
});

onMounted(() => {
  fetchClientFinanceSummary();
  fetchPartnerFinanceSummary();
});
</script>
