<script setup>
import { reactive, ref } from "vue";
import SupportOverview from '@/components/overviews/SupportOverView.vue';

</script>

<template>
  <!-- Hero -->
  <div class="content">
    <div
      class="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center py-2 text-center text-md-start"
    >
      <div class="flex-grow-1 mb-1 mb-md-0">
        <h1 class="h3 fw-bold mb-2">Главная</h1>
      </div>
    </div>
  </div>
  <!-- END Hero -->

  <!-- Page Content -->
  <div class="content">
      <SupportOverview/>
  </div>
  <!-- END Page Content -->
</template>
