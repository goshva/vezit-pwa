<template>
  <CustomDropdown
    v-model="selectedLocation"
    :options="locations"
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
</script>