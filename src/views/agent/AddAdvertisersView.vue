<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axiosInstance from "@/services/axios.js";

const route = useRoute();
const router = useRouter();
const advertiserData = ref(null);
const loading = ref(false);
const login = ref("");
const pass = ref("");
const clientId = ref("");

// Функция для загрузки данных
const fetchAdvertiserData = async () => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(`/advertisers/${route.params.id}`);
    advertiserData.value = response.data; // Данные рекламодателя
  } catch (error) {
    console.error("Ошибка загрузки данных рекламодателя:", error);
  } finally {
    loading.value = false;
  }
};

// Функция для обновления данных рекламодателя
const updateAdvertiserData = async () => {
  try {
    await axiosInstance.put(`/advertisers/${route.params.id}`, advertiserData.value);
    alert("Данные успешно обновлены!");
    // Редирект на страницу со списком рекламодателей
    router.push("/advertisers");
  } catch (error) {
    console.error("Ошибка обновления данных:", error);
    alert("Произошла ошибка при обновлении данных.");
  }
};

// Функция для отправки данных клиенту
const sendToClient = async () => {
  try {
    const response = await axiosInstance.post("/send-creds", {
      login: login.value,
      pass: pass.value,
      client_id: clientId.value,
    });
    console.log("Response:", response.data);
    alert("Данные отправлены клиенту успешно!");
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    alert("Произошла ошибка при отправке данных.");
  }
};

// Загружаем данные при монтировании компонента
onMounted(() => {
  fetchAdvertiserData();
});
</script>
<template>
  <BaseBlock title="Данные о рекламодателе" class="m-5">
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="advertiserData">
      <form @submit.prevent="updateAdvertiserData">
        <div>
          <!-- Sign In Form -->
          <div class="mb-4">
            <input
              type="text"
              class="form-control form-control-alt form-control-lg"
              v-model="advertiserData.name"
              placeholder="Название"
            />
          </div>

          <div class="mb-4">
            <input
              type="text"
              class="form-control form-control-alt form-control-lg"
              v-model="advertiserData.bussines"
              placeholder="Название компании"
            />
          </div>

          <div class="mb-4">
            <textarea
              class="form-control form-control-alt form-control-lg"
              v-model="advertiserData.description"
              placeholder="Описание"
            ></textarea>
          </div>

          <div class="mb-4">
            <input
              type="text"
              class="form-control form-control-alt form-control-lg"
              v-model="advertiserData.OGRN"
              placeholder="ОГРН"
            />
          </div>

          <div class="mb-4">
            <input
              type="text"
              class="form-control form-control-alt form-control-lg"
              v-model="advertiserData.BANK"
              placeholder="Банк"
            />
          </div>

          <div class="mb-4">
            <input
              type="text"
              class="form-control form-control-alt form-control-lg"
              v-model="advertiserData.BIK"
              placeholder="БИК"
            />
          </div>

          <div class="mb-4">
            <input
              type="text"
              class="form-control form-control-alt form-control-lg"
              v-model="advertiserData.contactName"
              placeholder="ФИО"
            />
          </div>

          <div class="mb-4">
            <input
              type="text"
              class="form-control form-control-alt form-control-lg"
              v-model="advertiserData.contactTel"
              placeholder="Контактный телефон"
            />
          </div>

          <div class="mb-4">
            <input
              type="email"
              class="form-control form-control-alt form-control-lg"
              v-model="advertiserData.contactEMail"
              placeholder="Электронная почта"
            />
          </div>

          <div class="mb-4">
            <input
              type="text"
              class="form-control form-control-alt form-control-lg"
              v-model="advertiserData.director_name"
              placeholder="ФИО директора"
            />
          </div>

          <div class="mb-4">
            <input
              type="text"
              class="form-control form-control-alt form-control-lg"
              v-model="advertiserData.director_tel"
              placeholder="Телефон директора"
            />
          </div>

          <div class="mb-4">
            <input
              type="password"
              class="form-control form-control-alt form-control-lg"
              placeholder="Пароль"
            />
          </div>

          <div class="mb-4">
            <button type="submit" class="btn w-100 btn-alt-primary">
              <i class=""></i>
              Отправить
            </button>
          </div>
          <div class="mb-4">
            <button
              type="button"
              class="btn w-100 btn-alt-secondary"
              @click="sendToClient"
            >
              Отправить клиенту
            </button>
          </div>
        </div>
      </form>
    </div>
    <div v-else>
      <p>Данные рекламодателя не найдены.</p>
    </div>
    <!-- END Sign In Form -->
  </BaseBlock>
  <!-- END Recent Orders -->
</template>

<style lang="scss"></style>
