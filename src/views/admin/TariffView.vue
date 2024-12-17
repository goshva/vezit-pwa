<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/services/axios.js';
import { formatDate, formatTimeElapsed } from '@/services/dateFormatter.js'; // Import the date formatter
import { formatRubles } from '@/services/priceConvert.js';
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";
import EditButton from '@/components/buttons/EditButton.vue';
import { createObjectFromArray } from '@/services/obj.js';
import CreateAutoModal from "@/components/modals/CreateAutoModal.vue";

// State for storing tariff data
const tariffs = ref([]);
const loading = ref(false);
const fieldNames = ref({});
// Pagination and filtering state
const currentPage = ref(1);
const lastPage = ref(1);
const filterStatus = ref(''); // '' for all, 'in-progress', 'completed', 'error', etc.

// State for toggling date format
const dateFormat = ref('elapsed'); // 'elapsed' or 'absolute'

// Fetch tariff data from API
const fetchTariffs = async (page = 1, status = '') => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(`/tariffs`, {
      params: {
        page: page,
        status: status,
      },
    });
    fieldNames.value = Object.keys(response.data[0]);
    console.log(fieldNames.value)
    tariffs.value = response.data;
    lastPage.value = response.data.last_page; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching tariff:', error);
  } finally {
    loading.value = false;
  }
};

// Fetch data when component mounts
const updateTariff = (updatedFields) => {
  console.log("Updated fieldNames:", updatedFields);
  fieldNames.value = updatedFields;
};

const handleSubmit = async (success) => {
  if (success) {
    await fetchTariffs(currentPage.value);
  }
};

onMounted(async () => {
  await fetchTariffs();
  if (fieldNames.value && fieldNames.value.length > 0) {
    createObjectFromArray(fieldNames.value);
  } else {
    console.warn("fieldNames is empty or undefined");
  }
});

// Handle filtering by status
const applyFilter = (status) => {
  filterStatus.value = status;
  fetchTariffs(1, status); // Reset to first page when filtering
};

// Handle pagination
const changePage = (page) => {
  fetchTariffs(page, filterStatus.value);
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
        <div class="space-x-4">
          <CreateAutoModal v-if="Object.keys(fieldNames).length > 0"
          :fieldNames="fieldNames" 
          @update:fieldNames="updateTariff"
          :title="'Добавить новый тариф'" 
          @submit="handleSubmit"
          />
        </div>
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
                    <EditButton :id="tariff.id" routeName="AdminEditTariff" :status="tariff.status" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <PaginationComponent v-if="lastPage > 1"
        :current-page="currentPage"
        :last-page="lastPage"
        @page-changed="changePage"
        />
      </template>
    </BaseBlock>
  </div>
</template>

<style lang="scss"></style>
