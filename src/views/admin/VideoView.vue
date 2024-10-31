<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/axios.js";
import { formatDate } from "@/services/dateFormatter.js";
import UploadVideoModal from "@/components/modals/UploadVideoModal.vue";
const route = useRoute();
// State for storing video data
const videos = ref([]);
const total = ref(0);
const loading = ref(false);

// Pagination and filtering state
const currentPage = ref(1);
const totalPages = ref(1);
const filterStatus = ref(""); // '' for all, 'in-progress', 'completed', 'error', etc.

// Fetch video data from API
const fetchEquipments = async (page = 1, status = "") => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(route.path, {
      params: {
        page: page,
        status: status,
      },
    });
    videos.value = response.data.data;
    total.value = response.data.total;
    totalPages.value = response.data.total_pages; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error("Error fetching video:", error);
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
    <BaseBlock title="Список рекламных компаний" class="mb-0">
      <template #options>
        <div class="space-x-4">
          <UploadVideoModal />

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
          <span>Загрузка...</span>
        </div>
        <div v-else class="block-content block-content-full">
          <div class="table-responsive">
            <table class="table table-hover table-vcenter">
              <thead>
                <tr>
                  <th class="d-xl-table-cell">Название</th>
                  <th>Статус</th>
                  <th class="d-none d-sm-table-cell text-center">Модератор</th>
                  <th class="d-none d-sm-table-cell text-end">Дата</th>
                  <th class="d-none d-sm-table-cell text-end"></th>
                </tr>
              </thead>
              <tbody class="fs-sm">
                <tr v-for="video in videos" :key="video.id">
                  <td class="d-xl-table-cell">{{ video.filename }}</td>
                  <td>
                    <span class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill" :class="{
                      'bg-success-light text-success': video.status === 1,
                      'bg-info-light text-info': !video.moderator,
                      'bg-danger-light text-danger': video.status === 0,
                      'bg-warning-light text-warning': video.status === 2,
                      'bg-light': video.status === 4 || video.status === 5 || video.status === 6,

                    }">
                      {{ !video.moderator ? "Ожидание" : video.status === 1 ? "Включено" : video.status === 0 ? "Отключено" : "Ошибка" }}
                    </span>

                  </td>
                  <td class="d-none d-sm-table-cell text-start">
                    <p v-if="video.moderator_id" class="mb-0">{{ video.moderator.name }}</p>
                  </td>
                  <td class="d-none d-sm-table-cell fw-semibold text-muted text-end">
                    {{ formatDate(video.updated_at) }}
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <div class="d-flex justify-content-evenly">
                      <router-link :to="{ name: 'AdminEditAd', params: { id: video.id } }">
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
  </div>
</template>

<style lang="scss"></style>
