<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/axios.js";
import { formatDate } from "@/services/dateFormatter.js";
import UploadCarModal from "@/components/modals/UploadCarModal.vue";
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";
import EditButton from '@/components/buttons/EditButton.vue';

const route = useRoute();
const cars = ref([]);
const total = ref(0);
const loading = ref(false);
const orderSearch = ref(false);
const currentPage = ref(1);
const lastPage = ref(1);
const filterStatus = ref("");

// Fetch video data from API
const fetchCars = async (page = 1, status = "") => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(route.path, {
      params: {
        page: page,
        status: status,
      },
    });
    cars.value = response.data.data;
    total.value = response.data.total;
    lastPage.value = response.data.last_page; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error("Error fetching video:", error);
  } finally {
    loading.value = false;
  }
};

// Fetch data when component mounts
onMounted(() => {
  fetchCars();
});

// Handle filtering by status
const applyFilter = (status) => {
  filterStatus.value = status;
  fetchCars(1, status); // Reset to first page when filtering
};

// Handle pagination
const changePage = (page) => {
  fetchCars(page, filterStatus.value);
};


</script>

<template>
  <div class="m-5 mb-0">
    <BaseBlock title="Список автомобилей" class="mb-0">
      <template #options>
        <div class="space-x-4">
          <UploadCarModal @addedCar="fetchCars"/>

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
                <span class="badge bg-primary rounded-pill">{{
                  total
                  }}</span>
              </a>

              <a class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)" @click.prevent="applyFilter(1)">
                Проверка
              </a>

              <a class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)" @click.prevent="applyFilter(2)">
                Ошибка
              </a>
            </div>
          </div>
        </div>
      </template>

      <template #content>
        <div v-if="loading" class="block-content text-center">
          <span>Загрузка авто...</span>
        </div>
        <div v-else class="block-content block-content-full">
          <div class="table-responsive">
            <table class="table table-hover table-vcenter">
              <thead>
                <tr>
                  <th class="d-xl-table-cell">Название</th>
                  <th class="d-xl-table-cell">Номер</th>
                  <th>Статус</th>
                  <th class="d-none d-sm-table-cell text-center">Партнёр</th>
                  <th class="d-none d-sm-table-cell text-center">Водитель</th>
                  <th class="d-none d-sm-table-cell text-end">Дата</th>
                  <th class="d-none d-sm-table-cell text-end"></th>
                </tr>
              </thead>
              <tbody class="fs-sm">
                <tr v-for="car in cars" :key="car.id">
                  <td class="d-xl-table-cell">{{ car.carModel }}</td>
                  <td class="d-none d-sm-table-cell text-start">
                    <p v-if="car.carVIN" class="mb-0">{{ car.carVIN }}</p>
                  </td>
                  <td>
                    <span class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill" :class="{
                      'bg-success-light text-success': car.status === 0,
                      'bg-info-light text-info': car.status === 1,
                      'bg-danger-light text-danger': car.status === 2,
                      'bg-warning-light text-warning': car.status === 3,
                      'bg-light': car.status === 4 || car.status === 5 || car.status === 6,

                    }">
                      {{ car.status === 0 ? "Включено" : car.status === 1 ? "Ожидание" : car.status === 3 ? "Отключено"
                      : "Ошибка" }}
                    </span>

                  </td>
                  <td class="d-none d-sm-table-cell text-start">
                    <p class="mb-0">{{ car.partner?.name }}</p>
                    <p class="mb-0">{{ car.partner?.contactName }}</p>
                  </td>
                  <td class="d-none d-sm-table-cell text-start">
                    <p v-if="car.driver" class="mb-0">{{ car.driver }}</p>
                  </td>
                  <td class="d-none d-sm-table-cell fw-semibold text-muted text-end">
                    {{ formatDate(car.updated_at) }}
                  </td>

                  <td class="d-none d-sm-table-cell text-end">
                    <EditButton :id="car.id" routeName="PartnerEditCar" />

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
