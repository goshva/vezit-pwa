<script setup>
import { defineProps, defineEmits } from "vue";
import ClientMap from "@/components/ClientMap.vue";

// Properties to control the active point on the map
const activePoint = defineProps(["activePoint"]);
const emits = defineEmits(["mapClick"]);

// Emit an event when a point on the map is clicked
const handleMapClick = (id) => {
  emits("mapClick", id);
};
</script>

<template>
  <!-- Render the map component with interaction props -->
  <ClientMap :activePoint="activePoint" @mapClick="handleMapClick" />
</template>

<style scoped>
/* Optional map-specific styling */
</style>
