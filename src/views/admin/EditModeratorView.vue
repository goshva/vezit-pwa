<template>
  <div class="m-5 mb-5">
    <BaseBlock title="Редактировать данные модератора">
      <template #content>
        <form @submit.prevent="handleSubmit" class="row g-3 m-2 mb-5">
          <!-- Existing Fields -->
          <div class="col-md-6 mb-3">
            <label for="moderid" class="form-label">ID Модератора</label>
            <input
              type="text"
              class="form-control"
              id="moderid"
              v-model="moderator.id"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="moderator_name" class="form-label">Название модератора</label>
            <input
              type="text"
              class="form-control"
              id="moderator_name"
              v-model="moderator.name"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="description" class="form-label">Описание</label>
            <input
              type="text"
              class="form-control"
              id="description"
              v-model="moderator.description"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="contactName" class="form-label">Имя контакта</label>
            <input
              type="text"
              class="form-control"
              id="contactName"
              v-model="moderator.contactName"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="contactTel" class="form-label">Телефон</label>
            <input
              type="text"
              class="form-control"
              id="contactTel"
              v-model="moderator.contactTel"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="contactEmail" class="form-label">Почта</label>
            <input
              type="text"
              class="form-control"
              id="contactEmail"
              v-model="moderator.contactEMail"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="status" class="form-label">Статус</label>
            <select class="form-control" id="status" v-model="moderator.status" required>
              <option value="0">Неактивный</option>
              <option value="1">Активный</option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label for="created_at" class="form-label">Дата создания</label>
            <input
              type="datetime-local"
              class="form-control"
              id="created_at"
              v-model="moderator.created_at"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="updated_at" class="form-label">Дата обновления</label>
            <input
              type="datetime-local"
              class="form-control"
              id="updated_at"
              v-model="moderator.updated_at"
              required
            />
          </div>

                    
        </form>
        
        <div class="row g-3 m-2 mb-5" v-if="moderator && moderator.id">
          <RemoveData :path="$route.path" @delete="handleDelete"/>
          <EditData :path="$route.path" :data="moderator" @submit="handleSubmit"/>
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
  name: "EditModeratorView",
  components: {
    RemoveData,
    EditData,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const status = route.params.status;

    // Define equipment as a reactive object with its expected properties
    const moderator = ref({
      id: "",
      user_id: "",
      name: "",
      description: "",
      contactName: "",
      contactTel: "",
      contactEMail: "",
      status: status,
      created_at: "",
      updated_at: "",
    });

    const fetchEquipmentDetails = async (id) => {
      try {
        const response = await axiosInstance.get(`/moderators/${id}`);
        moderator.value = { ...response.data, status: route.params.status };
      } catch (error) {
        console.error("Error fetching equipment details:", error);
      }
    };

    onMounted(() => {
      fetchEquipmentDetails(route.params.id);
    });

    const handleSubmit = async () => {
      try {
        await axiosInstance.put(`/moderators/${route.params.id}`, moderator.value);
        router.push("/moderators");
      } catch (error) {
        console.error("Error updating equipment:", error);
      }
    };

    return {
      moderator,
      handleSubmit,
    };
  },
};
</script>