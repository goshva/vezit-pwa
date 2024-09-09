<script setup>

import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axiosInstance from "@/services/axios.js";

const route = useRoute();
const router = useRouter();

// Message details
const supportMessage = ref({
  userId: 1,
  message: "",
  support_id:1,
});

// Fetch support details if necessary
const fetchSupportDetails = async () => {
  try {
    const response = await axiosInstance.get(`/support`);
    console.log('Fetched support details:', response.data);
  } catch (error) {
    console.error("Error fetching support details:", error);
  }
};

// Submit the support message
const handleSubmit = async () => {
  try {
    await axiosInstance.post(`/support`, supportMessage.value);
  } catch (error) {
    console.error("Error sending message to support:", error);
  }
};

onMounted(() => {
  fetchSupportDetails(route.params.id);
});
</script>

<template>

  <BaseBlock title="Обратная связь" class="m-5">
    <div class="">
      <!-- Support Form -->
      <div class="mb-4">
        Задайте свой вопрос:
      </div>
      <div class="mb-4">
        <input
          v-model="supportMessage.message"
          type="text"
          class="form-control form-control-alt form-control-lg"
          placeholder="Введите вопрос"
        />
      </div>

      <div class="mb-4">
        <strong>Наши контакты:
          8(999)-555-55-55
          example@mail.ru
        </strong>
      </div>

      <div class="mb-4">
        <button type="submit" class="btn w-100 btn-alt-primary" @click="handleSubmit">
          Отправить
        </button>
      </div>
    </div>
  </BaseBlock>

</template>

<style scoped lang="scss">

</style>
