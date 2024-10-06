<script>
import { ref, onMounted } from "vue";
import axiosInstance from "@/services/axios.js";
import { formatDate } from "@/services/dateFormatter.js"; // Import the date formatter
import UploadVideoModal from "@/components/modals/UploadVideoModal.vue";

// State for storing car data
const cars = ref([]);
const total = ref(0);
const loading = ref(false);
const orderSearch = ref(false);

// Pagination and filtering state
const currentPage = ref(1);
const totalPages = ref(1);
const filterStatus = ref(""); // '' for all, 'in-progress', 'completed', 'error', etc.

// Fetch car data from API
const fetchEquipments = async (page = 1, status = "") => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(`/partnerscars`, {
      params: {
        page: page,
        status: status,
      },
    });
    cars.value = response.data.data;
    total.value = response.data.total;
    totalPages.value = response.data.total_pages; // Adjust according to your API structure
    currentPage.value = page;
  } catch (error) {
    console.error("Error fetching car:", error);
  } finally {
    loading.value = false;
  }
};

// Fetch data when component mounts
onMounted(() => {
  fetchEquipments();
});

// Handle filtering by status
const applyFilter = (status) => {
  filterStatus.value = status;
  fetchEquipments(1, status); // Reset to first page when filtering
};

// Handle pagination
const changePage = (page) => {
  fetchEquipments(page, filterStatus.value);
};
</script>

<template>

</template>

<style>

</style>