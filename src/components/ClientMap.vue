<script setup>
import leaflet from "leaflet";
import { onMounted, watch } from "vue";

import { useMapStore } from "@/stores/map";
import { computed } from "vue";
const mapStore = useMapStore();

let map;
const props = defineProps(["activePoint"]);

let a = computed(() => {
  return props.activePoint;
});


onMounted(() => {
  map = leaflet.map("map").setView([43, 43], 4);
  leaflet
    .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      minZoom: 2,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map);

  mapStore.ads.forEach((el) => {
    leaflet
      .marker(el.latlong)
      .bindPopup(`<strong> ${el.name} </strong> <br> ${el.date}`)
      .addTo(map);
  });
});


</script>

<template>
  <div id="map"></div>
</template>

<style lang="css">
#map {
  width: 100%;
  height: calc(100vh - 115px);
  border: 2px solid black;
}
</style>
