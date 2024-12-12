<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";
import axiosInstance from '@/services/axios.js';
import { formatRubles } from '@/services/priceConvert.js';
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";
import { toggleDateFormat, formatDateBasedOnFormat } from '@/services/dateFormatter.js';
import EditButton from '@/components/buttons/EditButton.vue';
const route = useRoute();
const agents = ref([]);
const loading = ref(false);
const orderSearch = ref(false);

// Pagination and filtering state
const currentPage = ref(1);
const lastPage = ref(1);
const filterStatus = ref(''); // '' for all, 'in-progress', 'completed', 'error', etc.

// State for toggling date format
const dateFormat = ref('elapsed'); // 'elapsed' or 'absolute'

// Fetch client data from API
const fetchClients = async (page = 1, status = '') => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(route.path, {

      params: {
        page: page,
        status: status,
      },
    });
    agents.value = response.data.data.data; // Adjust according to your API structure
    lastPage.value = response.data.last_page; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching agents:', error);
  } finally {
    loading.value = false;
  }
};

// Fetch data when component mounts
onMounted(() => {
  fetchClients();
});

// Handle filtering by status
const applyFilter = (status) => {
  filterStatus.value = status;
  fetchClients(1, status); // Reset to first page when filtering
};

// Handle pagination
const changePage = (page) => {
  fetchClients(page, filterStatus.value);
};

const editClientStatus = async (status, index, id) => {
  agents.value[index].status = status > 0 ? 0 : 1;
  try {
    await axiosInstance.put(`/agents/${id}`, {
      status: agents.value[index].status
    })
  } catch (error) {
    console.error("Error updating ad:", error);
  }
}

// Toggle date format using service
const toggleFormat = () => {
  toggleDateFormat(dateFormat); // Pass the dateFormat ref to toggleDateFormat
};

// Format date using service
const formatClientDate = (dateString) => {
  return formatDateBasedOnFormat(dateString, dateFormat); // Pass the dateFormat ref
};
</script>

<template>
  <div class="m-5 mb-0">
    <BaseBlock title="Список агентов" class="mb-0">
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
                href="javascript:void(0)" @click.prevent="applyFilter('')">
                Все
                <span class="badge bg-primary rounded-pill">{{ agents.length }}</span>
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
          <span>Загрузка агентов...</span>
        </div>
        <div v-else class="block-content block-content-full">
          <div class="table-responsive">
            <table class="table table-hover table-vcenter">
              <thead>
                <tr>
                  <th class="d-xl-table-cell text-center">ФИО</th>
                  <th class="d-none d-sm-table-cell text-center">Телефон</th>
                  <th class="d-none d-sm-table-cell text-end">Почта</th>
                  <th class="d-none d-sm-table-cell text-end">Город</th>
                  <th class="d-none d-sm-table-cell text-end"><small>Кол-во клиентов в плане</small></th>
                  <th class="d-none d-sm-table-cell"></th>
                </tr>
              </thead>
              <tbody class="fs-sm">
                <tr v-for="agent in agents" :key="agent.id">
                  <td :title="agent.description">
                    <a class="fw-semibold" href="javascript:void(0)">{{ agent.last_name + ' ' + agent.first_name }}</a>
                    <p class="fs-sm fw-medium text-muted mb-0">{{ agent.contactEMail }}</p>
                  </td>

                  <td class="d-none d-sm-table-cell fw-semibold text-muted">
                    <a class="fw-semibold" href="javascript:void(0)">{{ agent.phone }}</a>
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <a class="fw-semibold" href="javascript:void(0)">{{ agent.email }}</a>
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <p class="fs-sm fw-medium text-muted mb-0">{{ agent.city }}</p>
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <p class="fs-sm fw-medium text-muted mb-0">{{ agent.planned_clients }}</p>
                  </td>
                  <td>
                    <EditButton :id="agent.id" routeName="AdminEditAgent" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <PaginationComponent v-if="lastPage > 1" :current-page="currentPage" :last-page="lastPage"
          @page-changed="changePage" />
      </template>
    </BaseBlock>
  </div>
</template>

<style lang="scss"></style>
