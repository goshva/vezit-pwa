<script setup>
import AgentOverView from '@/components/overviews/AgentOverView.vue';
</script>

<template>
  <div class="content">
    <div
      class="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center py-2 text-center text-md-start">
      <div class="flex-grow-1 mb-1 mb-md-0">
        <h1 class="h3 fw-bold mb-2">Главная</h1>
      </div>
    </div>
  </div>
  <div class="content">
    <AgentOverView />
  </div>
</template>
