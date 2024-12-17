<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/services/axios.js';
import { formatDate } from '@/services/dateFormatter.js'; // Import the date formatter
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";
import { createObjectFromArray } from '@/services/obj.js';
import CreateAutoModal from "@/components/modals/CreateAutoModal.vue";

// State for storing update_log data
const cfgupdate_log = ref([]);
const loading = ref(false);
const fieldNames = ref({});

// Pagination and filtering state
const currentPage = ref(1);
const lastPage = ref(1);
const filterStatus = ref(''); // '' for all, 'in-progress', 'completed', 'error', etc.

// Fetch update_log data from API
const fetchErrors = async (page = 1, status = '') => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(`/cfgupdate-logs`, {
      params: {
        page: page,
        status: status,
      },
    });
    fieldNames.value = Object.keys(response.data.data[0]);
    console.log(fieldNames.value)
    cfgupdate_log.value = response.data.data; // Adjust according to your API structure
    lastPage.value = response.data.last_page; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching update_log:', error);
  } finally {
    loading.value = false;
  }
};

// Fetch data when component mounts
const updateError = (updatedFields) => {
  console.log("Updated fieldNames:", updatedFields);
  fieldNames.value = updatedFields;
};

const handleSubmit = async (success) => {
  if (success) {
    await fetchErrors(currentPage.value);
  }
};

onMounted(async () => {
  await fetchErrors();
  if (fieldNames.value && fieldNames.value.length > 0) {
    createObjectFromArray(fieldNames.value);
  } else {
    console.warn("fieldNames is empty or undefined");
  }
});

// Handle filtering by status
const applyFilter = (status) => {
  filterStatus.value = status;
  fetchErrors(1, status); // Reset to first page when filtering
};

// Handle pagination
const changePage = (page) => {
  fetchErrors(page, filterStatus.value);
};
</script>

<template>
  <div class="m-5 mb-0">
    <BaseBlock title="Список системных ошибок" class="mb-0">
      <template #options>
        <div class="space-x-1">
          <CreateAutoModal v-if="Object.keys(fieldNames).length > 0"
          :fieldNames="fieldNames" 
          @update:fieldNames="updateError"
          :title="'Добавить новую ошибку'" 
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
                <span class="badge bg-primary rounded-pill">{{ cfgupdate_log.length }}</span>
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
                  <th>Описание</th>
                  <th class="d-none d-xl-table-cell">Партнер</th>
                  <th>Статус</th>
                  <th>IP</th>
                  <th class="d-none d-sm-table-cell text-end">Дата</th>
                </tr>
              </thead>
              <tbody class="fs-sm">
                <tr v-for="update_log in cfgupdate_log" :key="update_log.id">
                  <td>
                    <a class="fw-semibold" href="javascript:void(0)">{{ update_log.equipid }}</a>
                    <p class="fs-sm fw-medium text-muted mb-0">{{ update_log.annotation }}</p>
                  </td>
                  <td class="d-none d-xl-table-cell">
                    <a class="fw-semibold" href="javascript:void(0)">{{ update_log.partner_name }}</a>
                    <p class="fs-sm fw-medium text-muted mb-0">{{ update_log.partner_role }}</p>
                  </td>
                  <td>
                    <span
                      class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill"
                      :class="{
                        'bg-success-light text-success': update_log.status === 'completed',
                        'bg-info-light text-info': update_log.status === 'in-progress',
                        'bg-warning-light text-warning': update_log.status === 'error'
                      }"
                    >
                      {{ update_log.status === 1 ? 'В работе' : update_log.status === 0 ? 'Повторяется' : 'Исправленно' }}
                    </span>
                  </td>
                  <td><p>{{ update_log.lastip }}</p></td>
                  <td class="d-none d-sm-table-cell fw-semibold text-muted text-end">
                    {{ formatDate(update_log.created_at) }}
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
