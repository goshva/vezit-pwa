<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/services/axios.js';
import { formatRubles } from '@/services/priceConvert.js';
import { formatDate, formatTimeElapsed } from '@/services/dateFormatter.js';
import EditButton from "@/components/buttons/EditButton.vue";
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";
import CreateAutoModal from "@/components/modals/CreateAutoModal.vue";

const route = useRoute();
const partners = ref([]);
const loading = ref(false);
const fieldNames = ref({});
const currentPage = ref(1);
const lastPage = ref(1);
const filterStatus = ref('');

const dateFormat = ref('elapsed'); // 'elapsed' or 'absolute'

function createObjectFromArray(fieldMapping) {
  Object.keys(fieldMapping).forEach((key) => {
    fieldNames.value[fieldMapping[key]] = ""; // Initialize each field with an empty string
  });
}

const updatePartner = (updatedFields) => {
  console.log("Updated fieldNames:", updatedFields);
  fieldNames.value = updatedFields;
};

const handleSubmit = async (success) => {
  if (success) {
    await fetchPartners(currentPage.value);
  }
};

// Fetch location data from API
const fetchPartners = async (page = 1, status = '') => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(route.path, { 
      params: {
        page: page,
        status: status,
      },
    });
    console.log(response);
    partners.value = response.data.data;
    fieldNames.value = Object.keys(response.data.data[0]) // Adjust according to your API structure
    console.log(fieldNames.value)
    lastPage.value = response.data.last_page; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching location:', error);
  } finally {
    loading.value = false;
  }
};

// Fetch data when component mounts
onMounted(async () => {
  await fetchPartners().then(() => {
    createObjectFromArray(fieldNames.value)
    });
  });


// Handle filtering by status
const applyFilter = (status) => {
  filterStatus.value = status;
  fetchPartners(1, status); // Reset to first page when filtering
};

// Handle pagination
const changePage = (page) => {
  fetchPartners(page, filterStatus.value);
};

// Method to toggle date format
const toggleDateFormat = () => {
  dateFormat.value = dateFormat.value === 'elapsed' ? 'absolute' : 'elapsed';
};

const editPartnerStatus = async (status, index, id) => {
  partners.value[index].status = status > 0 ? 0 : 1;
  try {
    await axiosInstance.put( `${route.path}/${id}`, {
      status: partners.value[index].status})
  } catch(error) {
    console.error("Error updating ad:", error);
  }
}

// Method to format date based on the current format
const formatDateBasedOnFormat = (dateString) => {
  return dateFormat.value === 'elapsed' ? formatTimeElapsed(dateString) : formatDate(dateString);
};
</script>

<template>
  <div class="m-5 mb-0">
    <BaseBlock title="Список партнёров" class="mb-0">
      <template #options>
        <div class="space-x-1">
          <CreateAutoModal v-if="Object.keys(fieldNames).length > 0"
            :fieldNames="fieldNames" 
            @update:fieldNames="updatePartner"
            :title="'Добавить нового партнера'" 
            @submit="handleSubmit"
            />
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
                <span class="badge bg-primary rounded-pill">{{ partners.length }}</span>
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
          <span>Загрузка партнеров...</span>
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
                <tr v-for="partner in partners" :key="partner.id">
                  <td :title="partner.description">
                    <a class="fw-semibold" href="javascript:void(0)">{{ partner.name }}</a>
                    <p class="fs-sm fw-medium text-muted mb-0" >{{ partner.bussines }}</p>
                    <a class="fw-semibold" href="javascript:void(0)" >{{ partner.contactName }}</a>
                    <p class="fs-sm fw-medium text-muted mb-0" >{{ partner.contactTel }}</p>                    
                    <p class="fs-sm fw-medium text-muted mb-0" >{{ partner.contactEMail }}</p>                    
                  </td>
                
                  <td 
                    class="d-none d-sm-table-cell fw-semibold text-muted"
                    @click="toggleDateFormat"
                    style="cursor: pointer;"
                  >
                    {{ formatDateBasedOnFormat(partner.updated_at) }}
                  </td>
                  <td class="d-none d-sm-table-cell text-end">
                    <p class="fs-sm fw-medium text-muted mb-0">{{ formatRubles(partner.balance) }}</p>
                  </td>
                  <td class="d-none d-sm-table-cell text-end" @click="editPartnerStatus(partner.status, partners.indexOf(partner), partner.id)">
                    <i class="fa fa-fw fa-check text-success" v-if="parseInt(partner.status) >0" title="Готово"></i>
                    <i class="fas fa-spinner fa-spin" v-else title="В процессе"></i>
                  </td>
                  <td>
                    <EditButton :id="partner.id" routeName="AdminEditPartner" />
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
