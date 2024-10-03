<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axiosInstance from "@/services/axios.js";

// Vue Router instances
const route = useRoute();
const router = useRouter();

// Message details for support message
const supportMessage = ref({
  userId: 1,
  message: "",
  support_id: 1,
});

// State for message data and loading status
const messages = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);

// Function to fetch support messages (filtered by support ID if necessary)
const fetchSupportDetails = async (supportId = null) => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(`/support`, {
      params: {
        support_id: supportId,
        page: currentPage.value,
      },
    });
    messages.value = response.data.data; // Assuming the response contains an array of messages
    totalPages.value = response.data.total_pages; // Assuming the response contains pagination details
  } catch (error) {
    console.error("Error fetching support details:", error);
  } finally {
    loading.value = false;
  }
};

// Function to submit a support message
const handleSubmit = async () => {
  try {
    await axiosInstance.post(`/support`, supportMessage.value);
    console.log("Support message sent successfully");
  } catch (error) {
    console.error("Error sending message to support:", error);
  }
};

// Function to apply filter
const applyFilter = (status) => {
  fetchSupportDetails(route.params.id); // Add the logic for filtering based on status here
};

// Function to handle pagination
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchSupportDetails(route.params.id); // Fetch support details for the new page
  }
};

// Fetch support details when the component is mounted
onMounted(() => {
  fetchSupportDetails(route.params.id);
});
</script>

<template>
  
  <BaseBlock title="Обращения в техподдержку" class="mb-0">
    <template #options>
      <div class="space-x-1">
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
              <span class="badge bg-primary rounded-pill">{{ messages.length }}</span>
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
        <span>Загрузка сообщений...</span>
      </div>
      <div v-else class="block-content block-content-full">
        <div class="table-responsive">
          <table class="table table-hover table-vcenter">
            <thead>
              <tr>
                <th class="d-none d-sm-table-cell text-center">Сообщение / Ответ</th>
                <th class="d-none d-sm-table-cell text-center">Время</th>
                <th class="d-none d-sm-table-cell text-end">Статус</th>
                <th class="d-none d-sm-table-cell text-end"></th>
              </tr>
            </thead>
            <tbody class="fs-sm">
              <tr v-for="message in messages" :key="message.id">
                <td class="d-none d-sm-table-cell fw-semibold text-muted">
                  <p class="fw-medium mb-0">
                    {{ message.user_id }} : «{{ message.message }}»
                  </p>
                  <p v-if="message.support_answer" class="fw-medium mb-0">
                    {{ message.support_id }} : «{{ message.support_answer }}»
                  </p>
                </td>
                <td>
                  <p class="fs-sm fw-medium text-muted mb-0 text-center">
                    {{ message.updated_at }}
                  </p>
                </td>
                <td class="d-none d-sm-table-cell text-end">
                  <i class="fa fa-fw fa-check text-success" v-if="parseInt(message.status) > 0" title="Готово"></i>
                  <i class="fas fa-spinner fa-spin" v-else title="В процессе"></i>
                </td>
                <td class="d-sm-table-cell fw-semibold text-muted text-end">
                  <router-link :to="{ name: 'ResponseSupport', params: { id: message.id } }">
                    <button class="btn btn-sm btn-alt-primary">
                      <i class="fa fa-edit"></i>
                    </button>
                  </router-link>
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
</template>

<style scoped lang="scss"></style>
