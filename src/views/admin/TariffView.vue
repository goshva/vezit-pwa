<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/services/axios.js';
import { formatDate, formatTimeElapsed } from '@/services/dateFormatter.js'; // Import the date formatter
import { formatRubles } from '@/services/priceConvert.js';
// State for storing tariff data
const tariffs = ref([]);
const loading = ref(false);
const orderSearch = ref(false);

// Pagination and filtering state
const currentPage = ref(1);
const totalPages = ref(1);
const filterStatus = ref(''); // '' for all, 'in-progress', 'completed', 'error', etc.

// State for toggling date format
const dateFormat = ref('elapsed'); // 'elapsed' or 'absolute'

// Fetch tariff data from API
const fetchEquipments = async (page = 1, status = '') => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(`/tariffs`, {
      params: {
        page: page,
        status: status,
      },
    });
    tariffs.value = response.data;
    totalPages.value = response.data.total_pages; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching tariff:', error);
  } finally {
    loading.value = false;
  }
};

// Fetch data when component mounts
onMounted(() => {
  fetchEquipments();
});

// Handle filtering by status
const applyFilter = (status) => {
  filterStatus.value = status;
  fetchEquipments(1, status); // Reset to first page when filtering
};

// Handle pagination
const changePage = (page) => {
  fetchEquipments(page, filterStatus.value);
};

// Method to toggle date format
const toggleDateFormat = () => {
  dateFormat.value = dateFormat.value === 'elapsed' ? 'absolute' : 'elapsed';
};

// Method to format date based on the current format
const formatDateBasedOnFormat = (dateString) => {
  return dateFormat.value === 'elapsed' ? formatTimeElapsed(dateString) : formatDate(dateString);
};
</script>

<template>
  <div class="m-5 mb-0">
    <BaseBlock title="Список Тарифов" class="mb-0">
      <template #options>
        <button type="button" class="btn btn-primary push">
          <i class="fa fa-plus"></i>
        </button>
      </template>
      <template #content>
        <div v-if="loading" class="block-content text-center">
          <span>Загрузка...</span>
        </div>
        <div v-else class="block-content block-content-full">
          <div class="table-responsive">
            <table class="table table-hover table-vcenter">
              <thead>
                <tr>
                  <th class="d-xl-table-cell">Название</th>
                  <th>Показы ₽</th>
                  <th>Переходы ₽</th>
                  <th>Начало</th>
                  <th>Конец</th>
                  <th>Статус</th>
                  <th class="d-none d-sm-table-cell text-end">Дата</th>
                </tr>
              </thead>
              <tbody class="fs-sm">
                <tr v-for="tariff in tariffs" :key="tariff.id">
                  <td>
                    <a class="fw-semibold" href="javascript:void(0)">{{ tariff.name }}</a>
                    <p class="fs-sm fw-medium text-muted mb-0">{{ tariff.description }}</p>
                  </td>
                  <td>
                    <p class="fs-sm fw-medium text-muted mb-0">{{ formatRubles(tariff.view_cost) }}</p>
                  </td>                  
                  <td class="d-xl-table-cell">
                    <p class="fs-sm fw-medium text-muted mb-0">{{formatRubles(tariff.link_cost) }}</p>
                  </td>                  
                  <td>
                    <p class="fs-sm fw-medium text-muted mb-0">{{ tariff.start_date }}</p>
                  </td>                  
                  <td class="d-xl-table-cell">
                    <p class="fs-sm fw-medium text-muted mb-0">{{ tariff.end_date }}</p>
                  </td>
                  <td>
                    <span
                      class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill"
                      :class="{
                        'bg-success-light text-success': tariff.status === 'completed',
                        'bg-info-light text-info': tariff.status === 'in-progress',
                        'bg-warning-light text-warning': tariff.status === 'error'
                      }"
                    >
                      {{ tariff.status === 1 ? 'В работе' : tariff.status === 0 ? 'Выключено' : 'Неизвестно' }}
                    </span>
                  </td>
                  <td 
                    class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                    @click="toggleDateFormat"
                    style="cursor: pointer;"
                  >
                    {{ formatDateBasedOnFormat(tariff.updated_at) }}
                  </td>
                  <td>
                    <button class="btn btn-sm btn-alt-primary">
                      <i class="fa fa-edit"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </BaseBlock>
  </div>
</template>

<style lang="scss"></style>
