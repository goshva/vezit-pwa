<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";
import axiosInstance from "@/services/axios.js";
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";
import { createObjectFromArray } from '@/services/obj.js';
import CreateAutoModal from "@/components/modals/CreateAutoModal.vue";
const route = useRoute();

// State for storing user data
const users = ref([]);
const loading = ref(false);
const orderSearch = ref(false);
const fieldNames = ref({});

// Pagination and filtering state
const currentPage = ref(1);
const lastPage = ref(1);
const filterStatus = ref(''); // '' for all, 'in-progress', 'completed', 'error', etc.

// Fetch user data from API
const fetchEquipments = async (page = 1, status = '') => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(route.path, {
      params: {
        page: page,
        status: status,
      },
    });
    users.value = response.data.data;
    fieldNames.value = Object.keys(response.data.data[0]);
    console.log(fieldNames.value)
    // Adjust according to your API structure
    lastPage.value = response.data.last_page; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching user:', error);
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
</script>

<template>
  <div class="m-5 mb-0">
    <BaseBlock title="Контроль пользователей" class="mb-0">
      <template #options>
        <div class="space-x-1">
          <CreateAutoModal v-if="Object.keys(fieldNames).length > 0"
          :fieldNames="fieldNames" 
          @update:fieldNames="updatePartner"
          :title="'Добавить нового пользователя'" 
          @submit="handleSubmit" />
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
                <span class="badge bg-primary rounded-pill">{{ users.length }}</span>
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
          <span>Загрузка...</span>
        </div>
        <div v-else class="block-content block-content-full">
          <div class="table-responsive">
            <table class="table table-hover table-vcenter">
              <thead>
                <th>Имя</th>
                <th class="d-none d-xl-table-cell">Компания (Роль)</th>
                <th>Электронная почта</th>
                <th>Роль пользователя</th>
                <th>Статус</th>
                <th>Последний IP адрес</th>
                <th>Дата регистрации</th>
                <th></th>
              </thead>
              <tbody class="fs-sm">
                <tr v-for="user in users" :key="user.id">
                  <td>
                    <a class="fw-semibold" href="javascript:void(0)">
                      {{ user.fullusername }} <!-- Display full username -->
                    </a>
                    <a class="fw-normal text-muted" href="javascript:void(0)">
                      {{ user.username }} <!-- Display username -->
                    </a>
                  </td>
                  <td class="d-none d-xl-table-cell">
                    <a class="fw-semibold" href="javascript:void(0)">
                      {{ user.companyname }} <!-- Display company name -->
                    </a>
                    <span v-if="user.companyrole" class="text-muted">({{ user.companyrole }})</span> <!-- Display company role -->
                  </td>
                  <td>{{ user.email }}</td> <!-- Display email -->
                  <td>{{ user.userrole }}</td> <!-- Display user role -->
                  <td>{{ user.status === 0 ? 'Inactive' : 'Active' }}</td> <!-- Display status (Active/Inactive) -->
                  <td>{{ user.lastipaddr }}</td> <!-- Display last IP address -->
                  <td>
                    <strong>{{ new Date(user.created_at).toLocaleDateString() }}</strong>
                    <!-- Display formatted creation date -->
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <div class="d-flex justify-content-evenly">
                      <router-link :to="{ name: 'EditUserView', params: { id: user.id } }">
                        <button class="btn btn-sm btn-alt-primary">
                          <i class="fa fa-edit"></i>
                        </button>
                      </router-link>
                    </div>
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

<style lang="scss">
/* Add custom styles if necessary */
</style>
