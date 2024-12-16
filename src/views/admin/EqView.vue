<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/services/axios.js';
import { formatDate} from '@/services/dateFormatter.js';
import EditButton from '@/components/buttons/EditButton.vue';
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";
import CreateAutoModal from "@/components/modals/CreateAutoModal.vue";
import { createObjectFromArray } from '@/services/obj.js';

const dateFormat = ref('elapsed');
const route = useRoute();
const equipments = ref([]);
const loading = ref(false);
const fieldNames = ref({});
const currentPage = ref(1);
const lastPage = ref(1);
const filterStatus = ref(''); // '' for all, 'in-progress', 'completed', 'error', etc.



const editPartnerStatus = async (status, index, id) => {
  equipments.value[index].status = status > 0 ? 0 : 1;
  try {
    await axiosInstance.put( `${route.path}/${id}`, {
      status: equipments.value[index].status})
  } catch(error) {
    console.error("Error updating ad:", error);
  }
}
// Method to toggle date format
const toggleDateFormat = () => {
  dateFormat.value = dateFormat.value === 'elapsed' ? 'absolute' : 'elapsed';
};


const fetchEquipments = async (page = 1, status = '') => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(route.path, {
      params: {
        page: page,
        status: status,
      },
    });
    equipments.value = response.data.data;
    fieldNames.value = Object.keys(response.data.data[0])
    console.log(fieldNames.value)
    lastPage.value = response.data.last_page; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching equipment:', error);
  } finally {
    loading.value = false;
  }
};

const applyFilter = (status) => {
  filterStatus.value = status;
  fetchEquipments(1, status); // Reset to first page when filtering
};

// Handle pagination
const changePage = (page) => {
  fetchEquipments(page, filterStatus.value);
};
const updateEquipment = (updatedFields) => {
  console.log("Updated fieldNames:", updatedFields);
  fieldNames.value = updatedFields;
};
const handleSubmit = async (success) => {
  if (success) {
    await fetchEquipments(currentPage.value);
  }
};
onMounted(async () => {
  await fetchEquipments().then(() => {
    createObjectFromArray(fieldNames.value)
  });
});
</script>

<template>
  <div class="m-5 mb-0">
    <BaseBlock title="Оборудование" class="mb-0">
      <template #options>
        <div class="space-x-1">
          <CreateAutoModal v-if="Object.keys(fieldNames).length > 0"
          :fieldNames="fieldNames" 
          @update:fieldNames="updateEquipment"
          :title="'Добавить новое оборудование'" 
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
                <span class="badge bg-primary rounded-pill">{{ equipments.length }}</span>
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
          <span>Загрузка...</span>
        </div>
        <div v-else class="block-content block-content-full">
          <div class="table-responsive">
            <table class="table table-hover table-vcenter">
              <thead>
                <tr>
                  <th>ID</th>
                  <th class="d-none d-xl-table-cell">Партнер</th>
                  <th>Статус</th>
                  <th class="d-none d-sm-table-cell text-end">Дата</th>
                </tr>
              </thead>
              <tbody class="fs-sm">
                <tr v-for="equipment in equipments" :key="equipment.id">
                  <td>
                    <a class="fw-semibold" href="javascript:void(0)">{{ equipment.equipid }}</a>
                    <p class="fs-sm fw-medium text-muted mb-0">{{ equipment.description }}</p>
                  </td>
                  <td class="d-none d-xl-table-cell">
                    <a class="fw-semibold" href="javascript:void(0)">{{ equipment.partner_name }}</a>
                    <p class="fs-sm fw-medium text-muted mb-0">{{ equipment.partner_role }}</p>
                  </td>
                  <td class="d-none d-sm-table-cell text-end" @click="editPartnerStatus(equipment.status, partners.indexOf(partner), partner.id)">
                    <i class="fa fa-fw fa-check text-success" v-if="parseInt(equipment.status) >0" title="Готово"></i>
                    <i class="fas fa-spinner fa-spin" v-else title="В процессе"></i>
                  </td>
                  <td class="d-none d-sm-table-cell fw-semibold text-muted text-end">
                    {{ formatDate(equipment.created_at) }}
                  </td>
                  <td>
                    <EditButton :id="equipment.id" routeName="AdminEditEq" :status="equipment.status"/>
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
