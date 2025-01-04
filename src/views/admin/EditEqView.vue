<template>
  <div class="m-5 mb-5">
    <BaseBlock title="Редактировать данные оборудования">
      <template #content>
        <form @submit.prevent="handleSubmit" class="row g-3 m-2 mb-5">
          <!-- Existing Fields -->
          <div class="col-md-6 mb-3">
            <label for="equipid" class="form-label">ID оборудования</label>
            <CarEqDropdown
              v-model="equipment.id"
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
              <option value="2">Неизвестно</option>
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
          
          <!-- New Fields -->
          <div class="col-md-6 mb-3">
            <label for="sid" class="form-label">Серийный ID</label>
            <input
              type="text"
              class="form-control"
              id="sid"
              v-model="equipment.sid"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="apikey" class="form-label">API Key</label>
            <input
              type="text"
              class="form-control"
              id="apikey"
              v-model="equipment.apikey"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="apikey" class="form-label">Last Ip</label>
            <input
              type="text"
              class="form-control"
              id="apikey"
              v-model="equipment.lastipaddr"
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
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CarEqDropdown from "@/components/CarEqDropdown.vue"

export default {
  name: "EditEqView",
  props: {
    status: {
      type: Number,
      required: true
    }
  },
  components: {
    RemoveData,
    EditData,
    CarEqDropdown
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();

    // Define equipment as a reactive object with its expected properties
    const equipment = ref({
      id: "",
      description: "",
      partner_name: "",
      status: props.status,
      created_at: "",
      sid: "",
      apikey: "",
      lastIp:""

    });

    const fetchEquipmentDetails = async (id) => {
      try {
        const response = await axiosInstance.get(`/eq/${id}`);
        equipment.value = response.data;
      } catch (error) {
        console.error("Error fetching equipment details:", error);
      }
    };

      // Наблюдаем за изменением equipment.id
  watch(
    () => equipment.value.id,
    (newId) => {
      fetchEquipmentDetails(newId);
    }
  );


    onMounted(() => {
      fetchEquipmentDetails(route.params.id);
    });

    const handleSubmit = async () => {
      try {
        await axiosInstance.put(`/eq/${route.params.id}`, equipment.value);
        router.push("/eq");
      } catch (error) {
        console.error("Error updating equipment:", error);
      }
    };

    return {
      equipment,
      handleSubmit,
    };
  },
};
</script>