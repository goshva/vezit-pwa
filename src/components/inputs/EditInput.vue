<template>
    <div class="m-2">
      <input
        v-if="type !== 'checkbox'"
        :type="type"
        :id="id"
        :placeholder="placeholder"
        class="form-control form-control-alt form-control-lg"
        :value="value"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <div v-else>
        <input
          type="checkbox"
          :id="id"
          class="form-check-input"
          :value="value"
          @input="$emit('update:modelValue', $event.target.checked ? 'true' : 'false')"
        />
        <label class="form-check-label" :for="id">{{ placeholder }}</label>
      </div>

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
      value: {
        type: [String, Number],
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