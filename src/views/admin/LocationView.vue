<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/services/axios.js';
import { formatDate, formatTimeElapsed } from '@/services/dateFormatter.js'; // Import the date formatter
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";
import EditButton from '@/components/buttons/EditButton.vue';
import { createObjectFromArray } from '@/services/obj.js';
import CreateAutoModal from "@/components/modals/CreateAutoModal.vue";

// State for storing location data
const locations = ref([]);
const loading = ref(false);
const orderSearch = ref(false);
const fieldNames = ref({});
// Pagination and filtering state
const currentPage = ref(1);
const lastPage = ref(1);
const filterStatus = ref(''); // '' for all, 'in-progress', 'completed', 'error', etc.

// State for toggling date format
const dateFormat = ref('elapsed'); // 'elapsed' or 'absolute'

// Fetch location data from API
const fetchEquipments = async (page = 1, status = '') => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(`/locations`, {
      params: {
        page: page,
        status: status,
      },
    });
    fieldNames.value = Object.keys(response.data.data[0]);
    console.log(fieldNames.value)
    locations.value = response.data.data; // Adjust according to your API structure
    lastPage.value = response.data.last_page; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching location:', error);
  } finally {
    loading.value = false;
  }
};

// Fetch data when component mounts
const updatePartner = (updatedFields) => {
  console.log("Updated fieldNames:", updatedFields);
  fieldNames.value = updatedFields;
};

const handleSubmit = async (success) => {
  if (success) {
    await fetchEquipments(currentPage.value);
  }
};

onMounted(async () => {
  await fetchEquipments();
  if (fieldNames.value && fieldNames.value.length > 0) {
    createObjectFromArray(fieldNames.value);
  } else {
    console.warn("fieldNames is empty or undefined");
  }
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
    <BaseBlock title="Список локаций" class="mb-0">
      <template #options>
        <div class="space-x-1">
          <CreateAutoModal v-if="Object.keys(fieldNames).length > 0"
          :fieldNames="fieldNames" 
          @update:fieldNames="updatePartner"
          :title="'Добавить новую локацию'" 
          @submit="handleSubmit" />
          <div class="dropdown d-inline-block">
            <button
              type="button"
              class="btn btn-sm btn-alt-secondary"
              id="dropdown-recent-orders-filters"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-fw fa-flask"></i>
              Фильтр
              <i class="fa fa-angle-down ms-1"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-md dropdown-menu-end fs-sm" aria-labelledby="dropdown-recent-orders-filters">
              <a class="dropdown-item fw-medium d-flex align-items-center justify-content-between" href="javascript:void(0)" @click.prevent="applyFilter('')">
                Все
                <span class="badge bg-primary rounded-pill">{{ locations.length }}</span>
              </a>
              <a class="dropdown-item fw-medium d-flex align-items-center justify-content-between" href="javascript:void(0)" @click.prevent="applyFilter('in-progress')">
                В работе
                <span class="badge bg-primary rounded-pill">72</span>
              </a>
              <a class="dropdown-item fw-medium d-flex align-items-center justify-content-between" href="javascript:void(0)" @click.prevent="applyFilter('completed')">
                Готово
                <span class="badge bg-primary rounded-pill">890</span>
              </a>
              <a class="dropdown-item fw-medium d-flex align-items-center justify-content-between" href="javascript:void(0)" @click.prevent="applyFilter('error')">
                Ошибка
                <span class="badge bg-primary rounded-pill">997</span>
              </a>
            </div>
          </div>
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
                  <th>Название</th>
                  <th class="d-xl-table-cell">Локация</th>
                  <th>Статус</th>
                  <th class="d-none d-sm-table-cell text-end">Дата</th>
                </tr>
              </thead>
              <tbody class="fs-sm">
                <tr v-for="location in locations" :key="location.id">
                  <!-- <td>
                    <a class="fw-semibold" href="javascript:void(0)">{{ location.id }}</a>
                  </td> -->
                  <td>
                    <a class="fw-semibold" href="javascript:void(0)">{{ location.locationname }}</a>
                    <p class="fs-sm fw-medium text-muted mb-0">{{ location.locationenname }}</p>
                  </td>                  
                  <td class="d-none d-xl-table-cell">
                    <a class="fw-semibold" href="javascript:void(0)">{{ location.locationname }}</a>
                    <p class="fs-sm fw-medium text-muted mb-0">{{ location.locationenname }}</p>
                  </td>
                  <td>
                    <span
                      class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill"
                      :class="{
                        'bg-success-light text-success': location.status === 'completed',
                        'bg-info-light text-info': location.status === 'in-progress',
                        'bg-warning-light text-warning': location.status === 'error'
                      }"
                    >
                      {{ location.status === 1 ? 'В работе' : location.status === 0 ? 'Выключено' : 'Неизвестно' }}
                    </span>
                  </td>
                  <td 
                    class="d-none d-sm-table-cell fw-semibold text-muted text-end"
                    @click="toggleDateFormat"
                    style="cursor: pointer;"
                  >
                    {{ formatDateBasedOnFormat(location.updated_at) }}
                  </td>
                  <td>
                    <EditButton :id="location.id" routeName="AdminEditLocation" :status="location.status" />
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
