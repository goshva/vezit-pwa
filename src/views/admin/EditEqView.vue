<template>
  <div class="m-5 mb-5">
    <BaseBlock title="Редактировать данные оборудования">
      <template #content>
        <form @submit.prevent="handleSubmit" class="row g-3 m-2 mb-5">
          <div class="col-md-6 mb-3">
            <label for="equipid" class="form-label">ID оборудования</label>
            <input
              type="text"
              class="form-control"
              id="equipid"
              v-model="equipment.id"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="description" class="form-label">Описание</label>
            <input
              type="text"
              class="form-control"
              id="description"
              v-model="equipment.description"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="partner_name" class="form-label">Название партнера</label>
            <input
              type="text"
              class="form-control"
              id="partner_name"
              v-model="equipment.partner_name"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="status" class="form-label">Статус</label>
            <select class="form-control" id="status" v-model="equipment.status" required>
              <option value="0">Выключено</option>
              <option value="1">В работе</option>
              <option value="2">Ошибка</option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label for="created_at" class="form-label">Дата создания</label>
            <input
              type="datetime-local"
              class="form-control"
              id="created_at"
              v-model="equipment.created_at"
              required
            />
          </div>
        </form>
        <div class="row g-3 m-2 mb-5" v-if="equipment && equipment.id">
            <RemoveData :path="$route.path" @delete="handleDelete"/>
            <EditData :path="$route.path" :data="equipment" @submit="handleSubmit"/>
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
import { useRoute } from "vue-router";

export default {
  name: "EditEqView",
  components: {
    RemoveData,
    EditData,
  },
  setup() {
    const route = useRoute();
    const equipment = ref({});

    const fetchEquipmentDetails = async (id) => {
      try {
        const response = await axiosInstance.get(`https://app.olhar.media/api/equipments/${id}`);
        equipment.value = response.data;
      } catch (error) {
        console.error("Error fetching equipment details:", error);
      }
    };

    onMounted(() => {
      fetchEquipmentDetails(route.params.id);
    });

    const handleSubmit = async () => {
      try {
        await axiosInstance.put(`/equipments/${route.params.id}`, equipment.value);
        route.push("/equipment");
      } catch (error) {
        console.error("Error updating equipment:", error);
      }
    };

    const handleDelete = async() => {
      axiosInstance.delete(`/equipments/${this.route.params.id}`)
        .then(response => {
          console.log("Data deleted successfully!");
        })
        .catch(error => {
          console.error("Error deleting data:", error);
        });
    }

    return {
      equipment,
      handleSubmit,
    };
  },
};
</script>