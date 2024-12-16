<template>
  <div class="m-5 mb-5">
    <BaseBlock title="Редактировать данные агента">
      <template #content>а
        <form @submit.prevent="handleSubmit" class="row g-3 m-2 mb-5">
          <div class="col-md-6 mb-3">
            <label for="bussines" class="form-label">Фамилия</label>
            <input
              type="text"
              class="form-control"
              id="bussines"
              v-model="company.bussines"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="description" class="form-label">Имя</label>
            <input
              type="text"
              class="form-control"
              id="description"
              v-model="company.description"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="OGRN" class="form-label">Телефон</label>
            <input
              type="text"
              class="form-control"
              id="OGRN"
              v-model="company.OGRN"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="contactEMail" class="form-label">Электронная почта</label>
            <input
              type="email"
              class="form-control"
              id="contactEMail"
              v-model="company.contactEMail"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="contactName" class="form-label">Город</label>
            <input
              type="text"
              class="form-control"
              id="contactName"
              v-model="company.contactName"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="contactTel" class="form-label">Планируемое количество клиентов</label>
            <input
              type="number"
              class="form-control"
              id="contactTel"
              v-model="company.contactTel"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="status" class="form-label">Статус</label>
            <select class="form-control" id="status" v-model="company.status">
              <option value="0">Неактивный</option>
              <option value="1">Активный</option>
            </select>
          </div>
          <div class="row g-3 m-2 mb-5">
            <RemoveData :path="route.path" />
            <EditData :path="route.path" :data="company" />
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
const route = useRoute();

const company = ref({
  id: null,
  user_id: null,
  name: "",
  bussines: "",
  description: "",
  OGRN: "",
  BIK: "",
  contactName: "",
  contactTel: "",
  contactEMail: "",
  status: 0,
  created_at: null,
  updated_at: null,
});

const fetchCompanyDetails = async () => {
  try {
    const response = await axiosInstance.get(route.path);
    company.value = response.data;
  } catch (error) {
    console.error("Error fetching client details:", error);
  }
};

onMounted(() => {
  fetchCompanyDetails(route.params.id);
});
</script>

<style lang="css">
/* Add any additional styles if needed */
</style>
