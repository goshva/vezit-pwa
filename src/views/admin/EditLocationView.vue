<template>
  <div class="m-5 mb-5">
    <BaseBlock title="Редактировать данные локаций">
      <template #content>
        <form @submit.prevent="handleSubmit" class="row g-3 m-2 mb-5">
          <!-- Existing Fields -->
          <div class="col-md-6 mb-3">
            <label for="id" class="form-label">ID</label>
            <input
              type="text"
              class="form-control"
              id="id"
              v-model="location.id"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="locationid" class="form-label">ID Локации</label>
            <input
              type="text"
              class="form-control"
              id="locationid"
              v-model="location.locationid"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="locationcode" class="form-label">Код локации</label>
            <input
              type="text"
              class="form-control"
              id="locationcode"
              v-model="location.locationcode"
              required
            />
          </div>
          
          <!-- New Fields -->
          <div class="col-md-6 mb-3">
            <label for="locationenname" class="form-label">Название</label>
            <input
              type="text"
              class="form-control"
              id="locationenname"
              v-model="location.locationenname"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="locationname" class="form-label">Название локации</label>
            <input
              type="text"
              class="form-control"
              id="locationname"
              v-model="location.locationname"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="created_at" class="form-label">Дата создания</label>
            <input
              type="datetime-local"
              class="form-control"
              id="created_at"
              v-model="location.created_at"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="updated_at" class="form-label">Дата обновления</label>
            <input
              type="datetime-local"
              class="form-control"
              id="updated_at"
              v-model="location.updated_at"
              required
            />
          </div>
                    
        </form>
        
        <div class="row g-3 m-2 mb-5" v-if="location && location.id">
          <RemoveData :path="$route.path" @delete="handleDelete"/>
          <EditData :path="$route.path" :data="location" @submit="handleSubmit"/>
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
  setup() {
    const route = useRoute();
    const router = useRouter();

    // Define finance as a reactive object with its expected properties
    const location = ref({
      id: "",
      locationid: "",
      locationcode: "",
      locationenname: "",
      locationname: "",
      created_at: "",
      updated_at: ""
    });

    const fetchLocationDetails = async (id) => {
      try {
        const response = await axiosInstance.get(`/locations/${id}`);
        location.value = response.data;
      } catch (error) {
        console.error("Error fetching location details:", error);
      }
    };

    onMounted(() => {
      fetchLocationDetails(route.params.id);
    });

    const handleSubmit = async () => {
      try {
        await axiosInstance.put(`/locations/${route.params.id}`, location.value);
        router.push("/locations");
      } catch (error) {
        console.error("Error updating location:", error);
      }
    };

    return {
      location,
      handleSubmit,
    };
  },
};
</script>
