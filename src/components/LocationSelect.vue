<template>
  <CustomDropdown
    v-model="selectedLocation"
    :options="locations"
    @update:model-value="updateSelectedLocation"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import axiosInstance from "@/services/axios.js";
import CustomDropdown from "@/components/CustomDropdown.vue";

const selectedLocation = ref(null);
const locations = ref([]);

const fetchLocations = async () => {
  try {
      const response = await axiosInstance.get("/areas");
    console.log("API Response:", response.data);
    locations.value = response.data.data.map((location) => ({
      id: location.locationid,
      name: location.locationenname,
    }));
  } catch (error) {
    console.error("Failed to fetch locations:", error);
  }
};

onMounted(() => {
  fetchLocations();
});

const updateSelectedLocation = (selectedLocation) => {
  // Ищем выбранную локацию по id
  const location = locations.value.find(location => location.id === selectedLocation);
  if (location) {
    // Отправляем id выбранной локации обратно родителю
    emit('update:model-value', location.id);
  }
};

</script>