<template>
  <button
    type="button"
    class="btn btn-primary push"
    data-bs-toggle="modal"
    data-bs-target="#modal-block-normal"
  >
    <i class="fa-solid fa-plus"></i>
  </button>

  <div
    class="modal"
    id="modal-block-normal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-block-normal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <BaseBlock title="Загрузить автомобиль" transparent class="mb-0">
          <template #options>
            <button
              type="button"
              class="btn-block-option"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="fa fa-fw fa-times"></i>
            </button>
          </template>

          <template #content>
            <form @submit.prevent="handleSubmit">
              <div class="block-content">
                <input
                  class="form-control"
                  type="text"
                  id="driver"
                  v-model="driver"
                  placeholder="Driver"
                  required
                />
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="number"
                  id="partner_id"
                  v-model="partner_id"
                  placeholder="Partner ID"
                  required
                />
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="text"
                  id="carVIN"
                  v-model="carVIN"
                  placeholder="Car VIN"
                  required
                />
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="text"
                  id="carPlate"
                  v-model="carPlate"
                  placeholder="Car Plate"
                  required
                />
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="text"
                  id="carModel"
                  v-model="carModel"
                  placeholder="Car Model"
                  required
                />
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="text"
                  id="carColor"
                  v-model="carColor"
                  placeholder="Car Color"
                  required
                />
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="text"
                  id="carDescription"
                  v-model="carDescription"
                  placeholder="Car Description"
                  required
                />
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="text"
                  id="carType"
                  v-model="carType"
                  placeholder="Car Type"
                  required
                />
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="number"
                  id="carEquipmentID"
                  v-model="carEquipmentID"
                  placeholder="Car Equipment ID"
                  required
                />
              </div>
              <div class="block-content">
                <select class="form-control" id="status" v-model="status" required>
                  <option value="ожидает">ожидает</option>
                  <option value="в процессе">в процессе</option>
                  <option value="завершен">завершен</option>
                </select>
              </div>
              <div class="block-content block-content-full text-end">
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                  Save
                </button>
              </div>
            </form>
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axiosInstance from "@/services/axios.js";

const driver = ref("Арсен Быстров");
const partner_id = ref(1);  // Default partner ID for testing
const carVIN = ref("d1234567890");
const carPlate = ref("А0111Р126");
const carModel = ref("Toyota Corolla");
const carColor = ref("Белый");
const carDescription = ref("Хорошее техническое состояние");
const carType = ref("Легковой седан");
const carEquipmentID = ref(2);  // Default car equipment ID for testing
const status = ref("ожидает");  // Default status for testing


const handleSubmit = async () => {
  const formData = {
    driver: driver.value,
    partner_id: partner_id.value,
    carVIN: carVIN.value,
    carPlate: carPlate.value,
    carModel: carModel.value,
    carColor: carColor.value,
    carDescription: carDescription.value,
    carType: carType.value,
    carEquipmentID: carEquipmentID.value,
    status: status.value,
  };

  try {
    const response = await axiosInstance.post("/partnerscars", formData);

    if (response.status === 201) {
      console.log("Car data submitted successfully!");
    }
  } catch (error) {
    console.error("Error submitting car data:", error);
  }
};
</script>

<style lang="css">
/* Add any additional styles if needed */
</style>
