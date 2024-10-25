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
                  placeholder="Default Filename"
                  required
                />
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="text"
                  id="serverFilename"
                  v-model="serverfilename"
                  placeholder="Default Server Filename"
                  required
                />
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="number"
                  id="userId"
                  v-model="user_id"
                  placeholder="User ID"
                  required
                />
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="text"
                  id="duration"
                  v-model="duration"
                  placeholder="00:00:00"
                  required
                />
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="url"
                  id="url"
                  v-model="url"
                  placeholder="http://example.com/video.mp4"
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
                  placeholder="Main Location ID"
                  required
                />
              </div>
              <div class="block-content">
                <select class="form-control" id="status" v-model="status" required>
                  <option :value="1">Yes</option>
                  <option :value="0">No</option>
                </select>
              </div>
              <div class="block-content block-content-full text-end">
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                  Upload
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

const router = useRouter();
const videoFile = ref(null);

// Default values for required fields
const filename = ref("default_filename.mp4");
const serverfilename = ref("default_server_filename.mp4");
const user_id = ref(1);  // Default user ID
const duration = ref("00:00:00");  // Default duration
const url = ref("http://example.com/video.mp4");  // Default URL
const adddate = ref(new Date().toISOString().slice(0, 16));  // Default current date and time
const mainlocation = ref(1);  // Default main location ID
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
    formData.append("duration", duration.value);
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
        // Handle successful upload, e.g., navigate to another page or show success message
        console.log("Video uploaded successfully!");
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
