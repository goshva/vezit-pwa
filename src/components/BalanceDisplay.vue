<template>
    <button type="button" class="btn-block-option">
      <div class="d-inline-block">
        <p class="m-0" id="page-header-user-dropdown">
          Баланс: <strong>{{ balance }}</strong> ₽
        </p>
      </div>
    </button>
  </template>
  
  <script setup>
  const props = defineProps({
    balance: {
      type: Number,
      required: true,
    },
  });
  </script>
  