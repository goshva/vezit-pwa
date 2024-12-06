<template>
    <div class="m-5 mb-5">
      <BaseBlock title="Редактировать мою рекламу">
        <template #content>
          <video
            width="100%"
            height="100%"
            :src="storageBaseUrl + ad.serverfilename"
            controls
            frameborder="0"
          ></video>
          <form @submit.prevent="handleSubmit" class="row g-3 m-2 mb-5">
            <div class="col-md-6 mb-3">
              <label for="serverFilename" class="form-label">Название рекламной компании</label>
              <input
                type="text"
                class="form-control"
                id="adcampaign_name"
                v-model="ad.adcampaign_name"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="url" class="form-label">URL</label>
              <input
                type="url"
                class="form-control"
                id="url"
                v-model="ad.url"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="mainLocation" class="form-label">Основное местоположение</label>
             <LocationSelect v-model="ad.mainlocation" />
            </div>
            <div class="col-md-6 mb-3">
              <label for="status" class="form-label">Включено</label>
              <select class="form-control" id="status" v-model="ad.status">
                <option :value="1">Да</option>
                <option :value="0">Нет</option>
              </select>
            </div>
            <div class="row text-center p-3">
              <RemoveData :path="'videos/' + ad.id"></RemoveData>
              <EditData :path="route.path" :data="ad"></EditData>
            </div>
          </form>
        </template>
      </BaseBlock>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import axiosInstance from "@/services/axios.js";
  import RemoveData from "@/components/RemoveData.vue";
  import EditData from "@/components/EditData.vue";
  import LocationSelect from "@/components/LocationSelect.vue";

  const storageBaseUrl = import.meta.env.VITE_STORAGE_BASE_URL;

  const route = useRoute();
  const router = useRouter();
  
  const ad = ref({
    id: null,
    adcampaign_name: "",
    filename: "",
    serverfilename: "",
    userid: null,
    duration: "",
    url: "",
    mainlocation: null,
    status: 0,
  });
  
  const fetchAdDetails = async (id) => {
    try {
      const response = await axiosInstance.get(`/videos/${id}`);
      ad.value = response.data;
    } catch (error) {
      console.error("Error fetching ad details:", error);
    }
  };
  
  
  onMounted(() => {
    fetchAdDetails(route.params.id);
  });
  </script>
  