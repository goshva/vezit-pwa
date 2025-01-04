<template>
  <div class="m-5 mb-5">
    <BaseBlock title="Редактировать данные агента">
      <template #content>
        <form @submit.prevent="handleSubmit" class="row g-3 m-2 mb-5">
          <div class="col-md-6 mb-3">
            <label for="last_name" class="form-label">Фамилия</label>
            <input
              type="text"
              class="form-control"
              id="last_name"
              v-model="company.last_name"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="first_name" class="form-label">Имя</label>
            <input
              type="text"
              class="form-control"
              id="first_name"
              v-model="company.first_name"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="phone" class="form-label">Телефон</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              v-model="company.phone"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="email" class="form-label">Электронная почта</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="company.email"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="city" class="form-label">Город</label>
            <input
              type="text"
              class="form-control"
              id="city"
              v-model="company.city"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="planned_clients" class="form-label"
              >Планируемое количество клиентов</label>
            <input
              type="number"
              class="form-control"
              id="planned_clients"
              v-model="company.planned_clients"
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
    const response = await axiosInstance.get(`/agents/${route.params.id}`);
    company.value = response.data.data;
    console.log("Company object:", company.value);
  } catch (error) {
    console.error("Error fetching client details:", error);
  }
};

onMounted(() => {
  if (route.params.id) {
    fetchCompanyDetails();
  } else {
    console.error("Agent ID is missing in route parameters");
  }
});
</script>

<style lang="css">
/* Add any additional styles if needed */
</style>
