<template>
  <div class="col-md-6 mb-3">
    <label for="partner_id" class="form-label">Партнер</label>
    <CustomDropdown 
      :modelValue="modelValue" 
      @update:modelValue="updateValue" 
      :options="partners" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/services/axios.js';
import CustomDropdown from './CustomDropdown.vue';
import { defineProps, defineEmits } from 'vue';

defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
  },
});
const emit = defineEmits(['update:modelValue']);
const partners = ref([]);
const fetchPartners = async () => {
  try {
    const response = await axiosInstance.get('/partners');
    if (response.data?.data && Array.isArray(response.data.data)) {
      partners.value = response.data.data;
    } else {
      console.warn('Нет данных о партнёрах');
    }
  } catch (error) {
    console.error('Ошибка при загрузке партнеров:', error.message);
  }
};
// Метод для передачи значения родителю
const updateValue = (value) => {
  emit('update:modelValue', value);
};
onMounted(() => {
  fetchPartners();
});
</script>