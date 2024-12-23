<script setup>
import QrcodeVue from "qrcode.vue";

import { ref } from "vue";
import axios from "axios";

const login = ref("");
const pass = ref("");
const clientId = ref("");

const sendToClient = async () => {
  try {
    const response = await axios.post("/send-creds", {
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
</script>
<template>
  <BaseBlock title="Данные о рекламодателе" class="m-5">
    <div>
      <!-- Sign In Form -->
      <div class="mb-4">
        <input
          type="text"
          class="form-control form-control-alt form-control-lg"
          placeholder="Название"
        />
      </div>

      <div class="mb-4">
        <input
          type="text"
          class="form-control form-control-alt form-control-lg"
          placeholder="Название компании"
        />
      </div>

      <div class="mb-4">
        <textarea
          class="form-control form-control-alt form-control-lg"
          placeholder="Описание"
        ></textarea>
      </div>

      <div class="mb-4">
        <input
          type="text"
          class="form-control form-control-alt form-control-lg"
          placeholder="ОГРН"
        />
      </div>

      <div class="mb-4">
        <input
          type="text"
          class="form-control form-control-alt form-control-lg"
          placeholder="Банк"
        />
      </div>

      <div class="mb-4">
        <input
          type="text"
          class="form-control form-control-alt form-control-lg"
          placeholder="БИК"
        />
      </div>

      <div class="mb-4">
        <input
          type="text"
          class="form-control form-control-alt form-control-lg"
          placeholder="ФИО"
        />
      </div>

      <div class="mb-4">
        <input
          type="text"
          class="form-control form-control-alt form-control-lg"
          placeholder="Контактный телефон"
        />
      </div>

      <div class="mb-4">
        <input
          type="email"
          class="form-control form-control-alt form-control-lg"
          placeholder="Электронная почта"
        />
      </div>

      <div class="mb-4">
        <input
          type="text"
          class="form-control form-control-alt form-control-lg"
          placeholder="ФИО директора"
        />
      </div>

      <div class="mb-4">
        <input
          type="text"
          class="form-control form-control-alt form-control-lg"
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
        <button type="button" class="btn w-100 btn-alt-secondary" @click="sendToClient">
          Отправить клиенту
        </button>
      </div>
    </div>
    <!-- END Sign In Form -->
  </BaseBlock>
  <!-- END Recent Orders -->
</template>

<style lang="scss"></style>
