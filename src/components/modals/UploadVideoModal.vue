<template>
  <button
    type="button"
    class="btn btn-primary push"
    data-bs-toggle="modal"
    data-bs-target="#modal-block-normal"
  >
    <i class="fa-solid fa-plus"></i>
  </button>

  <div
    class="modal"
    id="modal-block-normal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-block-normal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <BaseBlock title="Загрузить видео" transparent class="mb-0">
          <template #options>
            <button
              type="button"
              class="btn-block-option"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="fa fa-fw fa-times"></i>
            </button>
          </template>

          <template #content>
            <form @submit.prevent="handleSubmit">
              <div class="block-content">
                <input
                  class="form-control"
                  type="file"
                  id="videoId"
                  @change="handleFileUpload"
                  accept="video/*"
                  required
                />
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="text"
                  id="filename"
                  v-model="filename"
                  placeholder="Название рекламной компании"
                  required
                />
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="text"
                  id="serverFilename"
                  v-model="serverfilename"
                  placeholder="Название файла видео"
                  required
                />
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="url"
                  id="url"
                  v-model="url"
                  placeholder="Ссылка для перехода с видео"
                  required
                />
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="datetime-local"
                  id="adddate"
                  v-model="adddate"
                  required
                />
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="number"
                  id="mainLocation"
                  v-model="mainlocation"
                  placeholder="Выбор локации"
                  required
                />
              </div>
              <div class="block-content">
                <select class="form-control" id="status" v-model="status" required>
                  <option  selected disabled>Выбор статуса</option>
                  <option :value="1">Включено</option>
                  <option :value="0">Выключено</option>
                </select>
              </div>
              <div class="block-content block-content-full text-end">
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                  Отправить
                </button>
              </div>
            </form>
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axiosInstance from "@/services/axios.js";
import { useRouter } from "vue-router";
import { defineEmits } from 'vue';
const emit = defineEmits(['created']);
const router = useRouter();
const videoFile = ref(null);

const filename = ref("");
const serverfilename = ref("");
const user_id = ref(1); 
const duration = ref(""); 
const url = ref("");
const adddate = ref(new Date().toISOString().slice(0, 16));
const mainlocation = ref(1); 
const status = ref(1);  // Default status status

const handleFileUpload = (event) => {
  videoFile.value = event.target.files[0];
};

const handleSubmit = async () => {
  if (videoFile.value) {
    const formData = new FormData();
    formData.append("video", videoFile.value);
    formData.append("filename", filename.value);
    formData.append("serverfilename", serverfilename.value);
    formData.append("user_id", user_id.value);
    formData.append("url", url.value);
    formData.append("adddate", adddate.value);
    formData.append("mainlocation", mainlocation.value);
    formData.append("status", status.value);

    try {
      const response = await axiosInstance.post("/allvideo/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        emit("created");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      // Handle error, e.g., show an error message
    }
  }
};
</script>

<style lang="css">
/* Add any additional styles if needed */
</style>
