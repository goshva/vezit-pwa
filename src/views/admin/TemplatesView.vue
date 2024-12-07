<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/services/axios.js';
import { formatDate } from '@/services/dateFormatter.js'; // Import the date formatter
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";

// State for storing doc data
const docs = ref([]);
const loading = ref(false);
const orderSearch = ref(false);

// Pagination and filtering state
const currentPage = ref(1);
const lastPage = ref(1);
const filterStatus = ref(''); // '' for all, 'in-progress', 'completed', 'error', etc.
const sortBy = ref('id'); // Колонка для сортировки
const sortOrder = ref('asc'); // 'asc' - по возрастанию, 'desc' - по убыванию

// Fetch doc data from API
const fetchEquipments = async (page = 1, status = '', sortBy = 'id', sortOrder = 'asc') => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(`/docs`, {
      params: {
        page: page,
        status: status,
        sortBy: sortBy,
        sortOrder: sortOrder,
      },
    });
    docs.value = response.data.data; // Adjust according to your API structure
    lastPage.value = response.data.last_page; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching doc:', error);
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
  fetchEquipments(1, status, sortBy.value, sortOrder.value); // Reset to first page when filtering
};

// Функция для сортировки по колонке
const handleSort = (column) => {
  if (sortBy.value === column) {
    // Если кликнули по той же колонке, меняем порядок сортировки
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    // Если кликнули по другой колонке, сортируем по ней по возрастанию
    sortBy.value = column;
    sortOrder.value = 'asc';
  }
  fetchEquipments(1, filterStatus.value, sortBy.value, sortOrder.value); // Сбрасываем на первую страницу при изменении сортировки
};

// Handle pagination
const changePage = (page) => {
  fetchEquipments(page, filterStatus.value);
};
</script>

<template>
  <div class="m-5 mb-0">
    <BaseBlock title="Список шаблонов документов" class="mb-0">
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
                <span class="badge bg-primary rounded-pill">{{ docs.length }}</span>
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
          <span>Загрузка документов...</span>
        </div>
        <div v-else class="block-content block-content-full">
          <div class="table-responsive">
            <table class="table table-hover table-vcenter">
              <thead>
                <!-- <tr>
                  <th>ID</th>
                  <th class="d-xl-table-cell">Название</th>
                  <th>Доступ</th>
                  <th class="d-none d-sm-table-cell text-end">Дата</th>
                </tr> -->
                <tr class="text-center">
                  <th @click="handleSort('id')" style="cursor: pointer">
                    Номер шаблона
                    <span v-if="sortBy === 'id'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                  </th>
                  <th @click="handleSort('filename')" style="cursor: pointer">
                    Наименование
                    <span v-if="sortBy === 'filename'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                  </th>
                  <th>Доступ</th>
                  <th @click="handleSort('updated_at')" style="cursor: pointer">
                    Последнее обновление
                    <span v-if="sortBy === 'updated_at'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
                  </th>
                  <th>Количество использований</th>
                </tr>
              </thead>
              <tbody class="fs-sm">
                <tr v-for="doc in docs" :key="doc.id">
                  <td>{{ doc.id }}</td>
                  <td class="d-xl-table-cell">{{ doc.filename }}</td>
                  <td>
                    <span
                      class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill"
                      :class="{
                        'bg-success-light text-success': doc.status,
                        'bg-danger-light text-danger': !doc.status,
                      }"
                    >
                      {{ doc.status ? 'Включено' : 'Отключено' }}
                    </span>
                  </td>
                  <td class="d-none d-sm-table-cell fw-semibold text-muted text-end">
                    {{ formatDate(doc.updated_at) }}
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <strong>{{ doc.price || '0' }}</strong>
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
