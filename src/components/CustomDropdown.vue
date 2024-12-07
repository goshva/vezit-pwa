<template>
  <div class="dropdown-wrapper">
    <select class="form-control" v-model="selectedValue" @change="onChange">
      <option value="" disabled>Выберите вариант</option>
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
  },
  options: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue']);
const selectedValue = ref(props.modelValue);
// Синхронизация modelValue <-> selectedValue
watch(
  () => props.modelValue,
  (newValue) => {
    selectedValue.value = newValue;
  },
  { immediate: true }
);
const onChange = () => {
  emit('update:modelValue', selectedValue.value);
};
</script>