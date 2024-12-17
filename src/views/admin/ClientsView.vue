<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";
import axiosInstance from '@/services/axios.js';
import { formatRubles } from '@/services/priceConvert.js';
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";
import { toggleDateFormat, formatDateBasedOnFormat } from '@/services/dateFormatter.js';
import EditButton from '@/components/buttons/EditButton.vue';
import { createObjectFromArray } from '@/services/obj.js';
import CreateAutoModal from "@/components/modals/CreateAutoModal.vue";

const route = useRoute();
const clients = ref([]);
const loading = ref(false);
const fieldNames = ref([]);
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
    fieldNames.value = Object.keys(response.data.data[0]);
    clients.value = response.data.data; // Adjust according to your API structure
    lastPage.value = response.data.last_page; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching clients:', error);
  } finally {
    loading.value = false;
  }
};

// Fetch data when component mounts
onMounted(async () => {
  await fetchClients();
  if (fieldNames.value && fieldNames.value.length > 0) {
    createObjectFromArray(fieldNames.value);
  } else {
    console.warn("fieldNames is empty or undefined");
  }
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
  clients.value[index].status = status > 0 ? 0 : 1;
  try {
    await axiosInstance.put(`/clients/${id}`, {
      status: clients.value[index].status})
  } catch(error) {
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
    <BaseBlock title="Список рекламодателей" class="mb-0">
      <template #options>
        <div class="space-x-1">
          <CreateAutoModal v-if="Object.keys(fieldNames).length > 0"
          :fieldNames="fieldNames" 
          @update:fieldNames="updateClient"
          :title="'Добавить нового рекламодателя'" 
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
                <span class="badge bg-primary rounded-pill">{{ clients.length }}</span>
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
          <span>Загрузка клиентов...</span>
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
                <tr v-for="client in clients" :key="client.id">
                  <td :title="client.description">
                    <a class="fw-semibold" href="javascript:void(0)">{{ client.name }}</a>
                    <p class="fs-sm fw-medium text-muted mb-0">{{ client.bussines }}</p>
                    <a class="fw-semibold" href="javascript:void(0)">{{ client.contactName }}</a>
                    <p class="fs-sm fw-medium text-muted mb-0">{{ client.contactTel }}</p>                    
                    <p class="fs-sm fw-medium text-muted mb-0">{{ client.contactEMail }}</p>                    
                  </td>
                
                  <td 
                    class="d-none d-sm-table-cell fw-semibold text-muted"
                    @click="toggleFormat"
                    style="cursor: pointer;"
                  >
                    {{ formatClientDate(client.updated_at) }}
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <p class="fs-sm fw-medium text-muted mb-0">{{ formatRubles(client.balance) }}</p>
                  </td>
                  <td class="d-none d-sm-table-cell text-end" @click="editClientStatus(client.status, clients.indexOf(client), client.id)">
                    <i class="fa fa-fw fa-check text-success" v-if="parseInt(client.status) >0" title="Готово"></i>
                    <i class="fas fa-spinner fa-spin" v-else title="В процессе"></i>
                  </td>
                  <td>
                    
                      <EditButton :id="client.id" routeName="AdminEditClient" />

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
