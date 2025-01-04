<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/axios.js";
import { formatDate } from "@/services/dateFormatter.js";
import DelButton from "@/components/buttons/DelButton.vue";
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";
import CreateAutoModal from "@/components/modals/CreateAutoModal.vue";
import EditAutoModal from "@/components/modals/EditAutoModal.vue";
import { createObjectFromArray } from '@/services/obj.js';
import * as bootstrap from 'bootstrap';

const route = useRoute();
const fieldNames = ref({});

// State
const videos = ref([]);
const total = ref(0);
const loading = ref(false);

// Pagination and filtering state
const currentPage = ref(1);
const lastPage = ref(1);
const filterStatus = ref(""); // '' for all, 'in-progress', 'completed', 'error', etc.

// Fetch video data from API
const fetchAdvertisers = async (page = 1, status = "") => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(route.path, {
      params: {
        page: page,
        status: status,
      },
    });
    fieldNames.value = Object.keys(response.data.data[0]);
    console.log(fieldNames.value)
    videos.value = response.data.data;
    console.log(videos.value)
    total.value = response.data.total;
    lastPage.value = response.data.last_page; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error("Error fetching video:", error);
  } finally {
    loading.value = false;
  }
};

const isVideoModerated = (video) => {
  return video.status === 1 || video.status === 0 && video.moderator
}

// Fetch data when component mounts
const updateAdvertiser = (updatedFields) => {
  console.log("Updated fieldNames:", updatedFields);
  fieldNames.value = updatedFields;
};

const handleSubmit = async (success) => {
  if (success) {
    await fetchAdvertisers(currentPage.value);
  }
};

// Fetch data when component mounts
onMounted(async () => {
  await fetchAdvertisers();
  if (fieldNames.value && fieldNames.value.length > 0) {
    createObjectFromArray(fieldNames.value);
  } else {
    console.warn("fieldNames is empty or undefined");
  }
});

// Handle filtering by status
const applyFilter = (status) => {
  filterStatus.value = status;
  fetchAdvertisers(1, status); // Reset to first page when filtering
};

// Handle pagination
const changePage = (page) => {
  fetchAdvertisers(page, filterStatus.value);
};

const selectedVideoId = ref(null);
const showEditModal = ref(false);

const openEditModal = (videoId) => {
  selectedVideoId.value = videoId;
  showEditModal.value = true;

  nextTick(() => {
    const modalElement = document.getElementById(`modal-block-edit-${videoId}`);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  });
};

const closeEditModal = () => {
  selectedVideoId.value = null;
  showEditModal.value = false;
};
</script>

<template>
  <div class="m-5 mb-0">
    <EditAutoModal 
    v-if="showEditModal && selectedVideoId"
    :id="selectedVideoId"
    :fieldNames="fieldNames" 
    :title="`Изменить видео`"
    @close="closeEditModal"
  />
    <BaseBlock title="Список рекламодателей" class="mb-0">
      <template #options>
        <div class="space-x-4">
          <CreateAutoModal v-if="Object.keys(fieldNames).length > 0"
          :fieldNames="fieldNames" 
          @update:fieldNames="updateAdvertiser"
          :title="'Добавить нового рекламодателя'"
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
                  <td class="d-xl-table-cell">
                      <p class="fw-semibold">{{ video.name }}</p>
                      <p class="fs-sm fw-medium text-muted mb-0">{{ video.description.slice(0, 120) + '...' }}</p>
                  </td>
                  <td>
                    <span class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill" :class="{
                      'bg-success-light text-success': video.status === 0,
                      'bg-info-light text-info': video.status === 1,
                      'bg-danger-light text-danger': video.status === 2,
                      'bg-warning-light text-warning': video.status === 3,
                      'bg-light': video.status === 4 || video.status === 5 || video.status === 6,

                    }">
                      {{ video.status === 0 ? "Включено" : video.status === 1 ? "Ожидание" : video.status === 3 ?
                        "Отключено" : "Ошибка" }}
                    </span>

                  </td>
                  <td class="d-none d-sm-table-cell text-start">
                    <p v-if="video.moderator" class="mb-0">{{ video.moderator.name }}</p>
                  </td>
                  <td class="d-none d-sm-table-cell fw-semibold text-muted text-end">
                    {{ formatDate(video.updated_at) }}
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <div class="d-flex justify-content-evenly">
                      <router-link
                        :to="{ name: 'ClientEditAd', params: { id: video.id } }">
                        <button class="btn btn-sm btn-alt-primary">
                          <i class="fa fa-edit"></i>
                        </button>
                      </router-link>

                      <button 
                        v-if="isVideoModerated(video)" 
                        class="btn btn-sm btn-alt-primary isModerated"
                        @click="openEditModal(video.id)"
                      >
                        <i class="fa fa-edit"></i>
                      </button> 
                      <DelButton 
                      v-if="isVideoModerated(video)" 
                      :id="video.id" :path="route.path" @deleted="fetchAdvertisers"/>
                      <DelButton v-if="isVideoModerated(video)" :id="video.id" :path="route.path" @deleted="fetchAdvertisers"/>
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

<style lang="scss"></style>