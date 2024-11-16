<template>
  <div class="m-5 mb-5">
    <BaseBlock title="Редактировать автомобиль">
      <template #content>
        <form @submit.prevent="handleSubmit" class="row g-3 m-2 mb-5">
          <div class="col-md-6 mb-3">
            <label for="driver" class="form-label">Водитель</label>
            <input
                type="text"
                class="form-control"
                id="driver"
                v-model="car.driver"
                required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="partner_id" class="form-label">ID партнера</label>
            <input
                type="number"
                class="form-control"
                id="partner_id"
                v-model="car.partner_id"
                required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="carVIN" class="form-label">VIN автомобиля</label>
            <input
                type="text"
                class="form-control"
                id="carVIN"
                v-model="car.carVIN"
                required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="carPlate" class="form-label">Номерной знак</label>
            <input
                type="text"
                class="form-control"
                id="carPlate"
                v-model="car.carPlate"
                required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="carModel" class="form-label">Модель автомобиля</label>
            <input
                type="text"
                class="form-control"
                id="carModel"
                v-model="car.carModel"
                required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="carColor" class="form-label">Цвет автомобиля</label>
            <input
                type="text"
                class="form-control"
                id="carColor"
                v-model="car.carColor"
                required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="carDescription" class="form-label">Описание автомобиля</label>
            <input
                type="text"
                class="form-control"
                id="carDescription"
                v-model="car.carDescription"
                required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="carType" class="form-label">Тип автомобиля</label>
            <input
                type="text"
                class="form-control"
                id="carType"
                v-model="car.carType"
                required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="carEquipmentID" class="form-label">ID оборудования автомобиля</label>
            <input
                type="number"
                class="form-control"
                id="carEquipmentID"
                v-model="car.carEquipmentID"
                required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="status" class="form-label">Статус</label>
            <select class="form-control" id="status" v-model="car.status">
              <option value="ожидает">ожидает</option>
              <option value="в процессе">в процессе</option>
              <option value="завершен">завершен</option>
            </select>
          </div>
          <div class="row g-3 m-2 mb-5">
            <RemoveData :path="route.path" />
            <EditData :path="route.path" :data="car" />
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

const car = ref({
  id: null,
  driver: "",
  partner_id: null,
  carVIN: "",
  carPlate: "",
  carModel: "",
  carColor: "",
  carDescription: "",
  carType: "",
  carEquipmentID: null,
  status: "ожидает",
});

const fetchCarDetails = async (id) => {
  try {
    const response = await axiosInstance.get( `mycars/${id}`);
    car.value = response.data;
  } catch (error) {
    console.error("Error fetching car details:", error);
  }
};

onMounted(() => {
  fetchCarDetails(route.params.id);
});
</script>

<style lang="css">
/* Add any additional styles if needed */
</style>