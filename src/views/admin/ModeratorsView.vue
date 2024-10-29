<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/services/axios.js';
import { formatDate, formatTimeElapsed } from '@/services/dateFormatter.js'; // Import the date formatter

// State for storing location data
const moderators = ref([]);
const loading = ref(false);
const orderSearch = ref(false);

// Pagination and filtering state
const currentPage = ref(1);
const totalPages = ref(1);
const filterStatus = ref(''); // '' for all, 'in-progress', 'completed', 'error', etc.

// State for toggling date format
const dateFormat = ref('elapsed'); // 'elapsed' or 'absolute'

// Fetch location data from API
const fetchEquipments = async (page = 1, status = '') => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(`/moderators`, {
      params: {
        page: page,
        status: status,
      },
    });
    moderators.value = response.data.data; // Adjust according to your API structure
    totalPages.value = response.data.total_pages; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching location:', error);
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
    <BaseBlock title="Список модераторов" class="mb-0">
      <template #options>
        <div class="space-x-1">
          <button type="button" class="btn btn-primary push" style="margin-right: 20px">
          <i class="fa fa-plus"></i>
          </button>
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
                <span class="badge bg-primary rounded-pill">{{ moderators.length }}</span>
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
          <span>Загрузка модераторов...</span>
        </div>
        <div v-else class="block-content block-content-full">
          <div class="table-responsive">
            <table class="table table-hover table-vcenter">
              <thead>
              <tr>
                <th class="d-xl-table-cell">Название</th>
                <th class="d-none d-sm-table-cell">Активность</th>
                <th class="d-none d-sm-table-cell text-end">Баланс ₽</th>
                <th class="d-none d-sm-table-cell text-end">Статус</th>

              </tr>
              </thead>
              <tbody class="fs-sm">
              <tr v-for="moderator in moderators" :key="moderator.id">
                <td :title="moderator.description">
                  <a class="fw-semibold" href="javascript:void(0)">{{ moderator.name }}</a>
                  <p class="fs-sm fw-medium text-muted mb-0" >{{ moderator.bussines }}</p>
                  <a class="fw-semibold" href="javascript:void(0)" >{{ moderator.contactName }}</a>
                  <p class="fs-sm fw-medium text-muted mb-0" >{{ moderator.contactTel }}</p>
                  <p class="fs-sm fw-medium text-muted mb-0" >{{ moderator.contactEMail }}</p>
                </td>

                <td
                    class="d-none d-sm-table-cell fw-semibold text-muted"
                    @click="toggleDateFormat"
                    style="cursor: pointer;"
                >
                  {{ formatDateBasedOnFormat(moderator.updated_at) }}
                </td>
                <td class="d-none d-sm-table-cell text-end">
                  <p class="fs-sm fw-medium text-muted mb-0">0</p>
                </td>
                <td class="d-none d-sm-table-cell text-end">
                  <i class="fa fa-fw fa-check text-success" v-if="parseInt(moderator.status) >0" title="Готово"></i>
                  <i class="fas fa-spinner fa-spin" v-else title="В процессе"></i>
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
        <div class="block-content block-content-full bg-body-light">
          <nav aria-label="Pagination">
            <ul class="pagination pagination-sm justify-content-end mb-0">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="javascript:void(0)" @click.prevent="changePage(currentPage - 1)" aria-label="Previous">Prev</a>
              </li>
              <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                <a class="page-link" href="javascript:void(0)" @click.prevent="changePage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="javascript:void(0)" @click.prevent="changePage(currentPage + 1)" aria-label="Next">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </template>
    </BaseBlock>
  </div>
</template>

<style lang="scss"></style>
