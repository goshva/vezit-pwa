<script setup>
import { defineProps, computed } from "vue";
import EventSidebar from "@/components/EventSidebar.vue";
import { useMapStore } from "@/stores/map";

// Receiving the active point as a prop
const props = defineProps(["activePoint"]);

const mapStore = useMapStore();

// Computed property to display both video views and clicks if both checkboxes are checked
const clicksAndViews = computed(() => {
  return {
    clicks: mapStore.clicksViews.length,
    views: mapStore.videoViews.length
  };
});
</script>

<template>
  <div class="sidebar">
    <div class="efficiency">
      <h3 class="sidebar-title">Ежедневная Эффективность</h3>
      <!-- <p class="metric">
        Координаты Активной Точки:
        <span class="coordinates">
          {{ props.activePoint ? props.activePoint.join(", ") : "Ничего не выбрано" }}
        </span>
      </p> -->
      <p class="metric">
        Клики / Просмотры:
        <span class="value">{{ clicksAndViews.clicks }} / {{ clicksAndViews.views }}</span>
      </p>
    </div>
    <EventSidebar />
  </div>


</template>

<style scoped>
.sidebar {
  width: 300px;
  
}

.sidebar-title {
  font-size: 1.2em;
  margin-bottom: 10px;
}
.efficiency{
  padding: 20px;
}
.metric {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.value {
  font-weight: bold;
}
</style>
