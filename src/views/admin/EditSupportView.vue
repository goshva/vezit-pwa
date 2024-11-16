<template>
  <div class="m-5 mb-5">
    <BaseBlock title="Редактировать данные Техподдержки">
      <template #content>
        <form @submit.prevent="handleSubmit" class="row g-3 m-2 mb-5">
          <!-- Existing Fields -->
          <div class="col-md-6 mb-3">
            <label for="id" class="form-label">ID</label>
            <input
              type="text"
              class="form-control"
              id="id"
              v-model="message.id"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="user_id" class="form-label">ID Пользователя</label>
            <input
              type="text"
              class="form-control"
              id="user_id"
              v-model="message.user_id"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="support_id" class="form-label">ID Техподдержки</label>
            <input
              type="text"
              class="form-control"
              id="support_id"
              v-model="message.support_id"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="status" class="form-label">Статус</label>
            <select class="form-control" id="status" v-model="message.status" required>
              <option value="0">Неизвестно</option>
              <option value="1">В работе</option>
              <option value="2">В работе</option>
            </select>
          </div>
          
          <!-- New Fields -->
          <div class="col-md-6 mb-3">
            <label for="message" class="form-label">Сообщение</label>
            <input
              type="text"
              class="form-control"
              id="message"
              v-model="message.message"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="support_answer" class="form-label">Ответ</label>
            <input
              type="text"
              class="form-control"
              id="support_answer"
              v-model="message.support_answer"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="created_at" class="form-label">Дата создания</label>
            <input
              type="datetime-local"
              class="form-control"
              id="created_at"
              v-model="message.created_at"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="updated_at" class="form-label">Дата обновления</label>
            <input
              type="datetime-local"
              class="form-control"
              id="updated_at"
              v-model="message.updated_at"
              required
            />
          </div>
                    
        </form>
        
        <div class="row g-3 m-2 mb-5" v-if="message && message.id">
          <RemoveData :path="$route.path" @delete="handleDelete"/>
          <EditData :path="$route.path" :data="message" @submit="handleSubmit"/>
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
  name: "EditSupportView",
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
    const message = ref({
      id: "",
      user_id: "",
      support_id: "",
      message: "",
      support_answer: "",
      status: props.status,
      created_at: "",
      updated_at: ""
    });

    const fetchSupportDetails = async (id) => {
      try {
        const response = await axiosInstance.get(`/messages/${id}`);
        message.value = response.data;
      } catch (error) {
        console.error("Error fetching support details:", error);
      }
    };

    onMounted(() => {
      fetchSupportDetails(route.params.id);
    });

    const handleSubmit = async () => {
      try {
        await axiosInstance.put(`/messages/${route.params.id}`, message.value);
        router.push("/messages");
      } catch (error) {
        console.error("Error updating support:", error);
      }
    };

    return {
      message,
      handleSubmit,
    };
  },
};
</script>
