<template>
  <button
    type="button"
    class="btn btn-primary push"
    data-bs-toggle="modal"
    data-bs-target="#modal-upload-image"
  >
    <i class="fa-solid fa-plus"></i>
  </button>

  <div
    class="modal"
    id="modal-upload-image"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-upload-image"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <BaseBlock title="Загрузить фото" transparent class="mb-0">
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
                  id="photoId"
                  @change="handleFileUpload"
                  accept="image/jpeg"
                  required
                />
              </div>

              <div v-if="errorMessage" class="alert alert-danger mt-2">
                {{ errorMessage }}
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

const router = useRouter();
const photoFile = ref(null);
const errorMessage = ref("");

// Set default values for required fields
const defaultValues = {
  filename: "default_filename.jpeg",
  serverfilename: "default_server_filename.jpeg",
  adddate: new Date().toISOString().slice(0, 16), // Default to current date and time
  url: "http://example.com/default_image.jpeg",
  status: 1, // Default status
};

const handleFileUpload = (event) => {
  errorMessage.value = ""; // Reset error message
  photoFile.value = event.target.files[0];
};

const handleSubmit = async () => {
  if (!photoFile.value) {
    errorMessage.value = "JPEG file is required and must be valid.";
    return;
  }

  const formData = new FormData();
  formData.append("photo", photoFile.value);

  // Append default values for required fields
  formData.append("filename", defaultValues.filename);
  formData.append("serverfilename", defaultValues.serverfilename);
  formData.append("adddate", defaultValues.adddate);
  formData.append("url", defaultValues.url);
  formData.append("status", defaultValues.status);

  try {
    const response = await axiosInstance.post("/docs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      router.back();
    }
  } catch (error) {
    console.error("Error uploading photo:", error);

    // Display specific validation errors if available
    if (error.response && error.response.data && error.response.data.errors) {
      errorMessage.value = Object.values(error.response.data.errors)
        .flat()
        .join(" ");
    } else {
      errorMessage.value = "An error occurred during upload. Please try again.";
    }
  }
};
</script>

<style lang="css">
/* Add any additional styles if needed */
</style>
