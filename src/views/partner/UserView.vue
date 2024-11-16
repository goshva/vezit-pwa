<template>

  <BaseBlock title="Данные о компании" class="m-5">
    <div>
      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" v-model="partner.name"
          placeholder="Название" />
      </div>
      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" v-model="partner.INN"
          placeholder="ИНН" />
      </div>

      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" v-model="partner.OGRN"
          placeholder="ОГРН/ОГРИП" />
      </div>

      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" v-model="partner.bussines"
          placeholder="Название компании" />
      </div>

      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" v-model="partner.contactName"
          placeholder="Директор(ФИО)" />
      </div>

      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" v-model="partner.legalAddress"
          placeholder="Юридический адрес" />
      </div>

      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" v-model="partner.actualAddress"
          placeholder="Фактический адрес" />
      </div>

      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" v-model="partner.OKVED"
          placeholder="Вид деятельности" />
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
const partner = ref({
  name: "",
  bussines: "",
  description: "",
  OGRN: "",
  BIK: "",
  INN: "",
  contactName: "",
  contactTel: "",
  contactEMail: "",
  status: null,
  created_at: "",
  updated_at: "",
});

const fetchAdDetails = async () => {
  try {
    const response = await axiosInstance.get(route.path);
    if (response.data != null) { partner.value = response.data.data }
  } catch (error) {
    console.error("Error fetching partner details:", error);
  }
};

const handleSubmit = async () => {
  try {
    await axiosInstance.post(route.path, partner.value);
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