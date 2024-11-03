<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/services/axios.js';
import { formatDate } from '@/services/dateFormatter.js'; // Import the date formatter
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";

// State for storing equipment data
const equipments = ref([]);
const loading = ref(false);
const orderSearch = ref(false);

// Pagination and filtering state
const currentPage = ref(1);
const lastPage = ref(1);
const filterStatus = ref(''); // '' for all, 'in-progress', 'completed', 'error', etc.

// Fetch equipment data from API
const fetchEquipments = async (page = 1, status = '') => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(`/equipments`, {
      params: {
        page: page,
        status: status,
      },
    });
    equipments.value = response.data.data; // Adjust according to your API structure
    lastPage.value = response.data.last_page; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching equipment:', error);
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
</script>

<template>
  <div class="m-5 mb-0">
    <BaseBlock title="Оборудование" class="mb-0">
      <template #options>
        <div class="space-x-1">
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
                <span class="badge bg-primary rounded-pill">{{ equipments.length }}</span>
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
                  <th>ID</th>
                  <th class="d-none d-xl-table-cell">Партнер</th>
                  <th>Статус</th>
                  <th class="d-none d-sm-table-cell text-end">Дата</th>
                </tr>
              </thead>
              <tbody class="fs-sm">
                <tr v-for="equipment in equipments" :key="equipment.id">
                  <td>
                    <a class="fw-semibold" href="javascript:void(0)">{{ equipment.equipid }}</a>
                    <p class="fs-sm fw-medium text-muted mb-0">{{ equipment.description }}</p>
                  </td>
                  <td class="d-none d-xl-table-cell">
                    <a class="fw-semibold" href="javascript:void(0)">{{ equipment.partner_name }}</a>
                    <p class="fs-sm fw-medium text-muted mb-0">{{ equipment.partner_role }}</p>
                  </td>
                  <td>
                    <span
                      class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill"
                      :class="{
                        'bg-success-light text-success': equipment.status === 'completed',
                        'bg-info-light text-info': equipment.status === 'in-progress',
                        'bg-warning-light text-warning': equipment.status === 'error'
                      }"
                    >
                      {{ equipment.status === 1 ? 'В работе' : equipment.status === 0 ? 'Выключено' : 'Неизвестно' }}
                    </span>
                  </td>
                  <td class="d-none d-sm-table-cell fw-semibold text-muted text-end">
                    {{ formatDate(equipment.created_at) }}
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
