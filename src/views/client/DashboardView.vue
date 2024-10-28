<script setup>
import { ref } from "vue";
import { useMapStore } from "@/stores/map";
import MapDisplay from "@/components/MapDisplay.vue";
import MetricsSidebar from "@/components/MetricsSidebar.vue";

// Accessing store data
const mapStore = useMapStore();
const activePoint = ref(0); // Track the active map point

// This function handles map clicks and updates the active point
const handleMapClick = (id) => {
  mapStore.selectAd(id);
  const selectedAd = mapStore.getAdById(id);
  activePoint.value = selectedAd ? selectedAd.latlong : [0, 0];
};
</script>

<template>
  <div class="dashboard-wrapper">
    <MapDisplay :activePoint="activePoint" @mapClick="handleMapClick" />
    <MetricsSidebar :activePoint="activePoint" />
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  display: flex;
}
</style>
