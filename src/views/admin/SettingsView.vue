<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/services/axios.js';
import LoadSettingsModal from "@/components/LoadSettingsModal.vue";
import { formatDate } from '@/services/dateFormatter.js'; // Import the date formatter

// State for storing cfgupdate data
const cfgupdates = ref([]);
const loading = ref(false);
const orderSearch = ref(false);

// Pagination and filtering state
const currentPage = ref(1);
const totalPages = ref(1);
const filterStatus = ref(''); // '' for all, 'in-progress', 'completed', 'error', etc.

// Fetch cfgupdate data from API
const fetchEquipments = async (page = 1, status = '') => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(`/cfgupdates`, {
      params: {
        page: page,
        status: status,
      },
    });
    cfgupdates.value = response.data.data; // Adjust according to your API structure
    totalPages.value = response.data.total_pages; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching cfgupdate:', error);
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
    <BaseBlock title="Изменение настроек оборудования" class="mb-0">
      <template #options>
        <div class="space-x-1">
          <button type="button" class="btn btn-primary push" style="margin-right: 20px">
          <i class="fa fa-plus"></i>
          </button>
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
                href="javascript:void(0)">
                Все
                <span class="badge bg-primary rounded-pill">20</span>
              </a>
              <a class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)">
                В работе
                <span class="badge bg-primary rounded-pill">72</span>
              </a>
              <a class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)">
                Готово
                <span class="badge bg-primary rounded-pill">890</span>
              </a>
              <a class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)">
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
                  <th>Имя</th>
                  <th>Статус</th>
                  <th class="d-sm-table-cell">IP</th>
                  <th class="d-sm-table-cell text-end">Дата</th>
                  <th class="d-sm-table-cell text-end">Настройка</th>
                </tr>
              </thead>`
              <tbody class="fs-sm">
                <tr v-for="cfgupdate in cfgupdates" :key="cfgupdate.id">
                  <td>
                    <a class="fw-semibold" href="javascript:void(0)">{{ cfgupdate.ver }}</a>
                    <p class="fs-sm fw-medium text-muted mb-0">{{ cfgupdate.dsc }}</p>
                  </td>
                  <td>
                    <span class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill" :class="{
                      'bg-success-light text-success': cfgupdate.status === 2,
                      'bg-info-light text-info': cfgupdate.status === 1,
                      'bg-warning-light text-warning': cfgupdate.status === 0
                    }">
                      {{ cfgupdate.status === 1 ? 'В работе' : cfgupdate.status === 0 ? 'Повторяется' : 'Исправленно'
                      }}
                    </span>
                  </td>
                  <td>
                    <p>{{ cfgupdate.listing }}</p>
                  </td>
                  <td class="d-none d-sm-table-cell fw-semibold text-muted text-end">
                    {{ formatDate(cfgupdate.created_at) }}
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <LoadSettingsModal />
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
                <a class="page-link" href="javascript:void(0)" @click.prevent="changePage(currentPage - 1)"
                  aria-label="Previous">Prev</a>
              </li>
              <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                <a class="page-link" href="javascript:void(0)" @click.prevent="changePage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="javascript:void(0)" @click.prevent="changePage(currentPage + 1)"
                  aria-label="Next">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </template>

    </BaseBlock>
    <!-- END Recent Orders -->
  </div>
</template>
<style lang="scss"></style>
