<script setup>
import { defineProps } from "vue";
import EventSidebar from "@/components/EventSidebar.vue";

// Receiving the active point as a prop
const props = defineProps(["activePoint"]);
</script>

<template>
  <div class="sidebar">
    <div class="efficiency">
      <h3 class="sidebar-title">Daily Efficiency</h3>
      <p class="metric">
        Active Point Coordinates:
        <span class="coordinates">
          {{ props.activePoint ? props.activePoint.join(", ") : "None selected" }}
        </span>
      </p>
      <p class="metric">
        Clicks / Views:
        <span class="value">45 / 100</span>
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
