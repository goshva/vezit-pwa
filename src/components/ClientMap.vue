<script setup>
import leaflet from "leaflet";
import { onMounted } from "vue";

import { useMapStore } from "@/stores/map";
const mapStore = useMapStore();

let map;


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
  height: calc(100vh - 115px);
}
</style>
