<template>
  <div class="m-5 mb-5">
    <BaseBlock title="Редактировать данные финансов">
      <template #content>
        <form @submit.prevent="handleSubmit" class="row g-3 m-2 mb-5">
          <!-- Existing Fields -->
          <div class="col-md-6 mb-3">
            <label for="financeid" class="form-label">ID</label>
            <input
              type="text"
              class="form-control"
              id="financeid"
              v-model="finance.id"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="description" class="form-label">Описание</label>
            <input
              type="text"
              class="form-control"
              id="description"
              v-model="finance.Description"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="user_id" class="form-label">ID пользователя</label>
            <input
              type="text"
              class="form-control"
              id="user_id"
              v-model="finance.user_id"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="status" class="form-label">Статус</label>
            <select class="form-control" id="status" v-model="finance.Status" required>
              <option value="0">Выключено</option>
              <option value="1">В работе</option>
              <option value="2">Неизвестно</option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label for="created_at" class="form-label">Дата создания</label>
            <input
              type="datetime-local"
              class="form-control"
              id="created_at"
              v-model="finance.created_at"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="updated_at" class="form-label">Дата обновления</label>
            <input
              type="datetime-local"
              class="form-control"
              id="updated_at"
              v-model="finance.updated_at"
              required
            />
          </div>
          
          <!-- New Fields -->
          <div class="col-md-6 mb-3">
            <label for="sid" class="form-label">Время</label>
            <input
              type="text"
              class="form-control"
              id="sid"
              v-model="finance.Time"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="title" class="form-label">Заголовок</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="finance.Title"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="apikey" class="form-label">Сумма</label>
            <input
              type="text"
              class="form-control"
              id="apikey"
              v-model="finance.Amount"
              required
            />
          </div>
                    
        </form>
        
        <div class="row g-3 m-2 mb-5" v-if="finance && finance.id">
          <RemoveData :path="$route.path" @delete="handleDelete"/>
          <EditData :path="$route.path" :data="finance" @submit="handleSubmit"/>
        </div>
      </template>
    </BaseBlock>
  </div>
</template>
<script>
import RemoveData from "@/components/RemoveData.vue";
import EditData from "@/components/EditData.vue";
import axiosInstance from "@/services/axios.js";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "EditFinanceView",
  props: {
    status: {
      type: Number,
      required: true
    }
  },
  components: {
    RemoveData,
    EditData,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    // Define finance as a reactive object with its expected properties
    const finance = ref({
      id: "",
      user_id: "",
      Time: "",
      Title: "",
      Description: "",
      Amount: "",
      Status: "",
      created_at: "",
      updated_at:""

    });

    const fetchFinanceDetails = async (id) => {
      try {
        const response = await axiosInstance.get(`/finances/${id}`);
        finance.value = response.data;
      } catch (error) {
        console.error("Error fetching equipment details:", error);
      }
    };

    onMounted(() => {
      fetchFinanceDetails(route.params.id);
    });

    const handleSubmit = async () => {
      try {
        await axiosInstance.put(`/finances/${route.params.id}`, finance.value);
        router.push("/finances");
      } catch (error) {
        console.error("Error updating equipment:", error);
      }
    };

    return {
      finance,
      handleSubmit,
    };
  },
};
</script>
