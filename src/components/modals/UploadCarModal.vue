<template>
  <button
    type="button"
    class="btn btn-primary push"
    data-bs-toggle="modal"
    data-bs-target="#modal-block-csv-upload"
  >
  <i class="fa-solid fa-plus"></i><i class="fa-solid fa-file-csv"></i>
  </button>
  <div
    class="modal"
    id="modal-block-csv-upload"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-block-csv-upload"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <BaseBlock title="Загрузить автомобили из таблицы CSV" transparent class="mb-0">
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
            <form @submit.prevent="handleUpload">
              <div class="block-content">
                <label for="csvFile" class="form-label">Файл CSV:</label>
                <input
                  class="form-control"
                  type="file"
                  id="csvFile"
                  accept=".csv"
                  @change="handleFileChange"
                  required
                />
              </div>
              <div class="block-content block-content-full text-end">
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                  Загрузить
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
import { ref, defineEmits } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/axios.js";

const route = useRoute();
const emit = defineEmits(["uploadedCSV"]);

const csvFile = ref(null);

const handleFileChange = (event) => {
  csvFile.value = event.target.files[0];
};

const handleUpload = async () => {
  if (!csvFile.value) {
    alert("Выберите файл CSV для загрузки.");
    return;
  }

  const formData = new FormData();
  formData.append("file", csvFile.value);

  try {
    await axiosInstance.post(`/upload-csv`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    emit("uploadedCSV");
    alert("Файл успешно загружен!");
  } catch (error) {
    console.error("Ошибка при загрузке CSV файла:", error);
    alert("Ошибка загрузки. Проверьте файл или повторите попытку.");
  }
};
</script>

<style lang="css">
/* Add any additional styles if needed */
</style>
