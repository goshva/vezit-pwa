<template>
  <div class="m-5 mb-5">
    <BaseBlock title="Редактировать данные тарифов">
      <template #content>
        <form @submit.prevent="handleSubmit" class="row g-3 m-2 mb-5">
          <!-- Existing Fields -->
          <div class="col-md-6 mb-3">
            <label for="id" class="form-label">ID</label>
            <input
              type="text"
              class="form-control"
              id="id"
              v-model="tariff.id"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="name" class="form-label">Название</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="tariff.name"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="description" class="form-label">Описание</label>
            <input
              type="text"
              class="form-control"
              id="description"
              v-model="tariff.description"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="status" class="form-label">Статус</label>
            <select class="form-control" id="status" v-model="tariff.status" required>
              <option value="0">Неизвестно</option>
              <option value="1">В работе</option>
              <option value="2">В работе</option>
            </select>
          </div>
          
          <!-- New Fields -->
          <div class="col-md-6 mb-3">
            <label for="start_date" class="form-label">Начало</label>
            <input
              type="text"
              class="form-control"
              id="start_date"
              v-model="tariff.start_date"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="end_date" class="form-label">Конец</label>
            <input
              type="text"
              class="form-control"
              id="end_date"
              v-model="tariff.end_date"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="view_cost" class="form-label">Показы</label>
            <input
              type="text"
              class="form-control"
              id="view_cost"
              v-model="tariff.view_cost"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="link_cost" class="form-label">Переходы</label>
            <input
              type="text"
              class="form-control"
              id="link_cost"
              v-model="tariff.link_cost"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="currency" class="form-label">Валюта</label>
            <input
              type="text"
              class="form-control"
              id="currency"
              v-model="tariff.currency"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="created_at" class="form-label">Дата создания</label>
            <input
              type="datetime-local"
              class="form-control"
              id="created_at"
              v-model="tariff.created_at"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="updated_at" class="form-label">Дата обновления</label>
            <input
              type="datetime-local"
              class="form-control"
              id="updated_at"
              v-model="tariff.updated_at"
              required
            />
          </div>
                    
        </form>
        
        <div class="row g-3 m-2 mb-5" v-if="tariff && tariff.id">
          <RemoveData :path="$route.path" @delete="handleDelete"/>
          <EditData :path="$route.path" :data="tariff" @submit="handleSubmit"/>
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
  name: "EditDocumentView",
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
  setup(props) {
    const route = useRoute();
    const router = useRouter();

    // Define finance as a reactive object with its expected properties
    const tariff = ref({
      id: "",
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      view_cost: "",
      link_cost: "",
      currency: "",
      status: props.status,
      created_at: "",
      updated_at: ""
    });

    const fetchTariffDetails = async (id) => {
      try {
        const response = await axiosInstance.get(`/tariffs/${id}`);
        tariff.value = response.data;
      } catch (error) {
        console.error("Error fetching equipment details:", error);
      }
    };

    onMounted(() => {
      fetchTariffDetails(route.params.id);
    });

    const handleSubmit = async () => {
      try {
        await axiosInstance.put(`/tariffs/${route.params.id}`, tariff.value);
        router.push("/tariffs");
      } catch (error) {
        console.error("Error updating equipment:", error);
      }
    };

    return {
      tariff,
      handleSubmit,
    };
  },
};
</script>
