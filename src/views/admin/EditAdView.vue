<template>
  <div class="m-5 mb-5">
    <BaseBlock title="Редактировать рекламу">
      <template #content>
        <video width="100%" height="100%" :src="storageBaseUrl+ad.url" controls frameborder="0" muted autoplay></video>
        <form @submit.prevent="handleSubmit" class="row g-3 m-2 mb-5">
          <div class="col-md-6 mb-3">
            <label for="filename" class="form-label">Название файла</label>
            <input type="text" class="form-control" id="filename" v-model="ad.filename" required />
          </div>
          <div class="col-md-6 mb-3">
            <label for="serverFilename" class="form-label">Имя файла на сервере</label>
            <input type="text" class="form-control" id="serverFilename" v-model="ad.serverfilename" required />
          </div>
          <div class="col-md-6 mb-3">
            <label for="userId" class="form-label">ID пользователя</label>
            <input type="number" class="form-control" id="userId" v-model="ad.userid" required />
          </div>
          <div class="col-md-6 mb-3">
            <label for="duration" class="form-label">Длительность</label>
            <input type="text" class="form-control" id="duration" v-model="ad.duration" required />
          </div>
          <div class="col-md-6 mb-3">
            <label for="url" class="form-label">URL</label>
            <input type="url" class="form-control" id="url" v-model="ad.url" required />
          </div>
          <div class="col-md-6 mb-3">
            <label for="mainLocation" class="form-label">Основное местоположение</label>
            <input type="number" class="form-control" id="mainLocation" v-model="ad.mainlocation" required />
          </div>
          <div class="col-md-6 mb-3">
            <label for="enabled" class="form-label">Включено</label>
            <select class="form-control" id="enabled" v-model="ad.status">
              <option :value="0">Да</option>
              <option :value="1">Нет</option>
            </select>
          </div>
          <div class="row g-3 m-2 mb-5">
            <RemoveData :path="route.path" />
            <EditData :path="route.path" :data="ad" />
          </div>
        </form>
      </template>
    </BaseBlock>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/axios.js";
import RemoveData from "@/components/RemoveData.vue";
import EditData from "@/components/EditData.vue";
const storageBaseUrl = import.meta.env.VITE_STORAGE_BASE_URL;
const route = useRoute();

const ad = ref({
  id: null,
  filename: "",
  serverfilename: "",
  userid: null,
  duration: "",
  url: "",
  mainlocation: null,
  enabled: 0,
});

const fetchAdDetails = async () => {
  try {
    const response = await axiosInstance.get(route.path);
    ad.value = response.data;
  } catch (error) {
    console.error("Error fetching ad details:", error);
  }
};

onMounted(() => {
  fetchAdDetails(route.params.id);
});
</script>
