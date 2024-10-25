<script setup>
import { ref, computed, watch } from "vue";
import { useMapStore } from "@/stores/map";

const mapStore = useMapStore();

// Checkboxes states
const showVideoViews = ref(true); // Default to showing video views
const showClickViews = ref(false);

// Watchers to fetch data based on checkbox state
watch(showVideoViews, async (newVal) => {
  if (newVal) {
    await mapStore.fetchVideoViews();
  }
});

watch(showClickViews, async (newVal) => {
  if (newVal) {
    await mapStore.fetchClickViews();
  }
});

// Computed property to display both video views and clicks if both checkboxes are checked
const adsToDisplay = computed(() => {
  if (showVideoViews.value && showClickViews.value) {
    return [...mapStore.videoViews, ...mapStore.clicksViews];
  } else if (showVideoViews.value) {
    return mapStore.videoViews;
  } else if (showClickViews.value) {
    return mapStore.clicksViews;
  } else {
    return []; // No ads to display if both are unchecked
  }
});

// Function to handle click
const handleClick = (id) => {
  mapStore.selectAd(id); 
};

// Computed property for styling the selected item
const isSelected = (id) => id === mapStore.selectedAd;
</script>

<template>
  <div class="event flex-grow-1 d-flex flex-column">
    <!-- Sort and Filter Buttons -->
    <div class="form-check form-inline">
      <label class="form-check-label" for="show-video-views">Показы</label>
      <input 
        v-model="showVideoViews" 
        class="form-check-input" 
        type="checkbox" 
        id="show-video-views" 
        @change="mapStore.toggleVideoViews"
        checked
      />
      
      <label class="form-check-label" for="show-click-views">Переходы</label>
      <input 
        v-model="showClickViews" 
        class="form-check-input" 
        type="checkbox" 
        id="show-click-views"
        @change="mapStore.toggleClickViews"
      />
    </div>

    <!-- Event List -->
    <div class="flex-grow-1 d-flex flex-column p-2 pt-0 flex-nowrap overflow-auto">
      <div v-for="el in adsToDisplay" :key="el.id" @click="handleClick(el.id)"
        :style="{ backgroundColor: isSelected(el.id) ? mapStore.selectedColor : 'white', marginInline: '-8px' }"
        class="cursor-pointer border-bottom border-dark d-flex justify-content-between align-items-center px-2">
        <span>{{ el.id }}</span>
        <span class="text-center">
          {{ el.event }} <br />
          ({{ el.date }})
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-inline {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  vertical-align: middle;
}
.event {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.cursor-pointer {
  cursor: pointer;
}

button {
  cursor: pointer;
  color: #333;
}
</style>
