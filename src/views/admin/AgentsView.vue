<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";
import axiosInstance from '@/services/axios.js';
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";
import EditButton from '@/components/buttons/EditButton.vue';
import CreateAutoModal from "@/components/modals/CreateAutoModal.vue";

const route = useRoute();
const fieldNames = ref({});


function createObjectFromArray(fieldMapping) {
  Object.keys(fieldMapping).forEach((key) => {
    fieldNames.value[fieldMapping[key]] = ""; // Initialize each field with an empty string
  });
}

const agents = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const lastPage = ref(1);

const fetchClients = async (page = 1, status = '') => {
  loading.value = true;

  try {
    const response = await axiosInstance.get(route.path, {
      params: {
        page: page,
        status: status,
      },
    });

    agents.value = response.data.data.data;
    fieldNames.value = Object.keys(response.data.data.data[0])
    console.log(fieldNames.value)
    lastPage.value = response.data.last_page; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching agents:', error);
  } finally {
    loading.value = false;
  }
};

const updatePartner = (updatedFields) => {
  console.log("Updated fieldNames:", updatedFields);
  fieldNames.value = updatedFields;
};

const handleSubmit = async (success) => {
  if (success) {
    await fetchClients(currentPage.value);
  }
};

// Fetch data when component mounts
onMounted(async () => {
  await fetchClients().then(() => {
    createObjectFromArray(fieldNames.value)
  });
});

</script>

<template>
  <div class="m-5 mb-0">
    <BaseBlock title="Список агентов" class="mb-0">
      <template #options>
        <div class="space-x-4">
          <CreateAutoModal v-if="Object.keys(fieldNames).length > 0"
          :fieldNames="fieldNames" 
          @update:fieldNames="updatePartner"
          :title="'Добавить нового агента'" 
          @submit="handleSubmit"
          routeName=route.path
          />
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
