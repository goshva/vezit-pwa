<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";
import axiosInstance from '@/services/axios.js';
import { formatDate } from '@/services/dateFormatter.js';
import PaginationComponent from "@/components/pagination/PaginationComponent.vue";

const route = useRoute();
const messages = ref([]);
const loading = ref(false);
const orderSearch = ref(false);
const currentPage = ref(1);
const lastPage = ref(1);
const filterStatus = ref(''); 
const fetchEquipments = async (page = 1, status = '') => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(route.path, {
      params: {
        page: page,
        status: status,
      },
    });
    messages.value = response.data.data
    lastPage.value = response.data.last_page;
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching message:', error);
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  fetchEquipments();
});


const changePage = (page) => {
  fetchEquipments(page, filterStatus.value);
};
</script>

<template>
  <div class="m-5 mb-0">
    <BaseBlock title="Обращения в техподдержку" class="mb-0">
      <template #content>
        <div v-if="loading" class="block-content text-center">
          <span>Загрузка сообщений...</span>
        </div>
        <div v-else class="block-content block-content-full">
          <div class="table-responsive">
            <table class="table table-hover table-vcenter">
              <thead>
                <tr>
                  <th class="d-none d-sm-table-cell text-center">№ Обращения</th>
                  <th class="d-none d-sm-table-cell text-center">Создатель запроса</th>
                  <th class="d-none d-sm-table-cell text-center">Дата и время создания</th>
                  <th class="d-none d-sm-table-cell text-center">Дата и время ответа</th>
                  <th class="d-none d-sm-table-cell text-center">Статус</th>
                </tr>
              </thead>
              <tbody class="fs-sm">
                <tr v-for="message in messages" :key="message.id">
                  <td class="d-none d-sm-table-cell fw-semibold text-muted text-center">
                    {{message.id}}
                  </td>
                  <td>
                    <p class="fs-sm fw-medium text-muted mb-0 text-center">
                      {{ message.user.username }}
                    </p>
                  </td>
                  <td>
                    <p class="fs-sm fw-medium text-muted mb-0 text-center">
                      {{ formatDate(message.created_at) }}
                    </p>
                  </td>
                  <td>
                    <p class="fs-sm fw-medium text-muted mb-0 text-center">
                      {{ formatDate(message.updated_at) }}
                    </p>
                  </td>
                  <td class="d-none d-sm-table-cell text-center">
                    <i class="fa fa-fw fa-check text-success" v-if="parseInt(message.status) > 0" title="Готово"></i>
                    <i class="fas fa-spinner fa-spin" v-else title="В процессе"></i>
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
