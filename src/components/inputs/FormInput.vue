<template>
    <div class="m-2">
      <input
        :type="type"
        :id="id"
        :placeholder="placeholder"
        class="form-control form-control-alt form-control-lg"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div v-if="error" class="text-danger">{{ error }}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: "FormInput",
    props: {
      type: {
        type: String,
        default: "text",
      },
      id: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        default: "",
      },
      modelValue: {
        type: [String, Number],
        default: "",
      },
      error: {
        type: String,
        default: "",
      },
    },
  };
  </script>
  
  <style scoped>
  .text-danger {
    font-size: 0.875rem;
  }
  </style>
  