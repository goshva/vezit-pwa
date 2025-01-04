<template>
  <div>
    <customDropdown
      v-model="selectedId"
      :options="equipmentOptions"
      @update:modelValue="onSelectionChange"
    />
  </div>
</template>

<script>
import customDropdown from "@/components/customDropdown.vue";
import { ref, onMounted } from "vue";
import axiosInstance from "@/services/axios.js";
export default {
  name: "CarEqDropdown",
  components: { customDropdown },
  props: {
    modelValue: {
      type: [String, Number],
      default: null,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const equipmentOptions = ref([]);
    const selectedId = ref(props.modelValue);
const fetchEquipmentList = async () => {
  try {
    const response = await axiosInstance.get("/eq"); // URL для получения списка оборудования
    // Обращаемся к `response.data.data`, чтобы извлечь массив оборудования
    if (response.data && Array.isArray(response.data.data)) {
      equipmentOptions.value = response.data.data.map((item) => ({
        id: item.id,
        name: item.equipid, // Используем описание для отображения
      }));
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error fetching equipment list:", error);
  }
};
    const onSelectionChange = (value) => {
      emit("update:modelValue", value);
    };
    onMounted(() => {
      fetchEquipmentList();
    });
    return {
      equipmentOptions,
      selectedId,
      onSelectionChange,
    };
  },
};
</script>