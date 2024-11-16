<template>
  <div class="m-5 mb-5">
    <BaseBlock title="Редактировать пользователя">
      <template #content>
        <form @submit.prevent="handleSubmit" class="row g-3 m-2 mb-5">
          <div class="col-md-6 mb-3">
            <label for="username" class="form-label">Имя пользователя</label>
            <input type="text" class="form-control" id="username" v-model="user.username" required />
          </div>
          <div class="col-md-6 mb-3">
            <label for="email" class="form-label">Электронная почта</label>
            <input type="email" class="form-control" id="email" v-model="user.email" required />
          </div>
          <div class="col-md-6 mb-3">
            <label for="userrole" class="form-label">Роль пользователя</label>
            <select name="userrole" id="userrole" v-model="user.userrole" required class="form-control">
              <option value="admin">Администратор</option>
              <option value="moderator">Модератор</option>
              <option value="partner">Партнер</option>
              <option value="client">Клиент</option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label for="status" class="form-label">Статус</label>
            <select class="form-control" id="status" v-model="user.status">
              <option value="0">Не активен</option>
              <option value="1">Активен</option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label for="lastipaddr" class="form-label">Последний IP-адрес</label>
            <input type="text" class="form-control" id="lastipaddr" v-model="user.lastipaddr" disabled />
          </div>
          <div class="col-md-6 mb-3">
            <label for="fullusername" class="form-label">Полное имя</label>
            <input type="text" class="form-control" id="fullusername" v-model="user.fullusername" required />
          </div>
          <div class="col-md-6 mb-3">
            <label for="companyname" class="form-label">Название компании</label>
            <input type="text" class="form-control" id="companyname" v-model="user.companyname" required />
          </div>
          <div class="col-md-6 mb-3">
            <label for="companyrole" class="form-label">Роль в компании</label>
            <input type="text" class="form-control" id="companyrole" v-model="user.companyrole" required />
          </div>
          <div class="row g-3 m-2 mb-5">
            <RemoveData :path="route.path" />
            <EditData :path="route.path" :data="user" />
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

const user = ref({
  id: null,
  username: "",
  email: "",
  userrole: "partner",
  status: 0,
  lastipaddr: "",
  fullusername: "",
  companyname: "",
  companyrole: "",
});

const fetchUserDetails = async () => {
  try {
    const response = await axiosInstance.get(route.path);
    user.value = response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error("User not found");
    } else {
      console.error("Error fetching user details:", error);
    }
  }
};

onMounted(() => {
  fetchUserDetails();
});
</script>

<style lang="css">
/* Add any additional styles if needed */
</style>
