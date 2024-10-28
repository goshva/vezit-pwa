<template>

  <BaseBlock title="Данные о компании" class="m-5">
    <div class="">
      <!-- Sign In Form -->
      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" placeholder="ИНН" />
      </div>

      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" v-model="ad.OGRN" placeholder="ОГРН/ОГРИП" />
      </div>

      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" v-model="ad.bussines" placeholder="Название компании" />
      </div>

      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" v-model="ad.contactName" placeholder="Директор(ФИО)" />
      </div>

      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" placeholder="Юридический адрес" />
      </div>

      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" v-model="ad.name" placeholder="Фактический адрес" />
      </div>

      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" v-model="ad.bussines" placeholder="Вид деятельности" />
      </div>

      <div class="mb-2">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="login-remember" name="login-remember" />
          <label class="form-check-label" for="login-remember">Я согласен с договором оферты</label>
        </div>
      </div>

      <div class="mb-4">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="login-remember" name="login-remember" />
          <label class="form-check-label" for="login-remember">Создать договор оферты</label>
        </div>
      </div>

      <div class="mb-4">
        <button type="submit" class="btn w-100 btn-alt-primary" @click="handleSubmit">
          <i class=""></i>
          Отправить
        </button>
      </div>
    </div>
    <!-- END Sign In Form -->
  </BaseBlock>
  <!-- END Recent Orders -->

</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axiosInstance from "@/services/axios.js";

const route = useRoute();
const router = useRouter();

const ad = ref({
  id: null,
  filename: "",
  serverfilename: "",
  duration: "",
  url: "",
  mainlocation: null,
  enabled: 0,
  user_id: null,
  name: "",
  bussines: "",
  description: "",
  OGRN: "",
  BIK: "",
  contactName: "",
  contactTel: "",
  contactEMail: "",
  status: null,
  created_at: "",
  updated_at: "",
});

const fetchAdDetails = async () => {
  try {
    const response = await axiosInstance.get(`/about`);
    ad.value = response.data.data;
  } catch (error) {
    console.error("Error fetching ad details:", error);
  }
};

const handleSubmit = async () => {
  try {
    await axiosInstance.put(`/about`, ad.value);
    router.push("/Pdashboard");
  } catch (error) {
    console.error("Error updating partner:", error);
  }
};

onMounted(() => {
  fetchAdDetails(route.params.id);
});
</script>
<style lang="scss"></style>
