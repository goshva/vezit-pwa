<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/services/axios.js';
import { formatDate } from '@/services/dateFormatter.js'; // Import the date formatter
import { formatRubles } from '@/services/priceConvert.js';
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";
// State for storing finance data
const finances = ref([]);
const loading = ref(false);
const orderSearch = ref(false);

// Pagination and filtering state
const currentPage = ref(1);
const lastPage = ref(1);
const filterStatus = ref(''); // '' for all, 'in-progress', 'completed', 'error', etc.

// Fetch finance data from API
const fetchEquipments = async (page = 1, status = '') => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(`/finance`, {
      params: {
        page: page,
        status: status,
      },
    });
    finances.value = response.data.data; // Adjust according to your API structure
    lastPage.value = response.data.last_page; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching finance:', error);
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
    <BaseBlock title="Финансы" class="mb-0">
      <template #options>
        <div class="space-x-1">
          <div class="dropdown d-inline-block">
            <button type="button" class="btn btn-sm btn-alt-secondary" id="dropdown-recent-orders-filters"
              data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fa fa-fw fa-flask"></i>
              Фильтр
              <i class="fa fa-angle-down ms-1"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-md dropdown-menu-end fs-sm"
              aria-labelledby="dropdown-recent-orders-filters">
              <a class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)" @click.prevent="applyFilter('')">
                Все
                <span class="badge bg-primary rounded-pill">{{ finances.length }}</span>
              </a>
              <a class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)" @click.prevent="applyFilter('in-progress')">
                В работе
                <span class="badge bg-primary rounded-pill">72</span>
              </a>
              <a class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)" @click.prevent="applyFilter('completed')">
                Готово
                <span class="badge bg-primary rounded-pill">890</span>
              </a>
              <a class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)" @click.prevent="applyFilter('error')">
                Ошибка
                <span class="badge bg-primary rounded-pill">997</span>
              </a>
            </div>
          </div>
        </div>
      </template>

      <template #content>
        <div v-if="loading" class="block-content text-center">
          <span>Загрузка финансов...</span>
        </div>
        <div v-else class="block-content block-content-full">
          <div class="table-responsive">
            <table class="table table-hover table-vcenter">
              <thead>
                <tr>
                  <th class="d-xl-table-cell">Событие</th>
                  <th>Время</th>
                  <th class="d-none d-sm-table-cell text-center">Описание</th>
                  <th class="d-none d-sm-table-cell text-end">Сумма</th>
                  <th class="d-none d-sm-table-cell text-end">Статус</th>
                </tr>
              </thead>
              <tbody class="fs-sm">
                <tr v-for="finance in finances" :key="finance.Event">
                  <td>
                    <p v-if="parseFloat(finance.Amount) < 0" class="fs-sm fw-medium text-muted mb-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="red" style="width: 32px">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      Списание
                    </p>
                    <p v-if="parseFloat(finance.Amount) > 0" class="fs-sm fw-medium text-muted mb-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="green" class="w-3 h-3" style="width: 32px">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      Пополнение
                    </p>
                  </td>

                  <td>
                    <p class="fs-sm fw-medium text-muted mb-0">
                      {{ finance.UpdatedAt }}
                    </p>
                  </td>
                  <td class="d-none d-sm-table-cell fw-semibold text-muted">
                    {{ finance.Title }}
                    <p class="fw-small mb-0">
                      {{ finance.usernameD || "Имя пользователя" }}
                    </p>
                  </td>
                  <td class="d-none d-sm-table-cell fw-semibold text-muted text-end">
                    {{formatRubles(finance.Amount)}} ₽
                  </td>

                  <td class="d-none d-sm-table-cell text-end">
                    <i class="fa fa-fw fa-check text-success" v-if="parseInt(finance.Status) >0" title="Готово"></i>
                    <i class="fas fa-spinner fa-spin" v-else title="В процессе"></i>
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
