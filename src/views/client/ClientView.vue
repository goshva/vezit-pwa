<template>
  <div class="m-5 mb-5">
    <BaseBlock title="Редактировать автомобиль">
      <template #content>
        <form @submit.prevent="handleSubmit" class="row g-3 m-2 mb-5">
          <div class="col-md-6 mb-3">
            <label for="filename" class="form-label">Название файла</label>
            <input type="text" class="form-control" id="filename" v-model="ad.name" required />
          </div>
          <div class="col-md-6 mb-3">
            <label for="serverFilename" class="form-label">Имя файла на сервере</label>
            <input type="text" class="form-control" id="serverFilename" v-model="ad.serverfilename" required />
          </div>
          <div class="col-md-6 mb-3">
            <label for="userId" class="form-label">ID пользователя</label>
            <input type="number" class="form-control" id="userId" v-model="ad.userid" required />
          </div>
          <div class="col-md-6 mb-3">
            <label for="duration" class="form-label">Длительность</label>
            <input type="text" class="form-control" id="duration" v-model="ad.duration" required />
          </div>
          <div class="col-md-6 mb-3">
            <label for="url" class="form-label">URL</label>
            <input type="url" class="form-control" id="url" v-model="ad.url" required />
          </div>
          <div class="col-md-6 mb-3">
            <label for="mainLocation" class="form-label">Основное местоположение</label>
            <input type="number" class="form-control" id="mainLocation" v-model="ad.mainlocation" required />
          </div>
          <div class="col-md-6 mb-3">
            <label for="enabled" class="form-label">Включено</label>
            <select class="form-control" id="enabled" v-model="ad.enabled">
              <option :value="1">Да</option>
              <option :value="0">Нет</option>
            </select>
          </div>
          <div class="col-md-12 text-center p-3">
            <button type="submit" class="btn btn-primary">Сохранить изменения</button>
          </div>
        </form>
      </template>
    </BaseBlock>
  </div>

  <BaseBlock title="Данные о компании" class="m-5">
    <div class="">
      <!-- Sign In Form -->
      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" placeholder="ИНН" />
      </div>

      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" placeholder="ОГРН/ОГРИП" />
      </div>

      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" placeholder="Название компании" />
      </div>

      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" placeholder="Директор(ФИО)" />
      </div>

      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" placeholder="Юридический адрес" />
      </div>

      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" placeholder="Фактический адрес" />
      </div>

      <div class="mb-4">
        <input type="text" class="form-control form-control-alt form-control-lg" placeholder="Вид деятельности" />
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
        <button type="submit" class="btn w-100 btn-alt-primary">
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
  userid: null,
  duration: "",
  url: "",
  mainlocation: null,
  enabled: 0,
});

const fetchAdDetails = async () => {
  try {
    const response = await axiosInstance.get(`/client`);
    ad.value = response.data.data;
  } catch (error) {
    console.error("Error fetching ad details:", error);
  }
};

const handleSubmit = async () => {
  try {
    await axiosInstance.put(`/profile`, ad.value);
    router.push("/partner");
  } catch (error) {
    console.error("Error updating ad:", error);
  }
};

onMounted(() => {
  fetchAdDetails(route.params.id);
});
</script>
<style lang="scss"></style>
