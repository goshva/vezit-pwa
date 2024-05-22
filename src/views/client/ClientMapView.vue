<script setup>
import leaflet from "leaflet";
import { onMounted } from "vue";
let map;

let marker;
let marker2;
let marker3;
let long;
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

  marker = leaflet
    .marker([43, 43])
    .bindPopup(`This is Littleton, CO.`)
    .addTo(map);
  marker2 = leaflet
    .marker([50, 53])
    .bindPopup("This is Littleton, CO.")
    .addTo(map);
  marker3 = leaflet
    .marker([13, 20])
    .bindPopup("This is Littleton, CO")
    .addTo(map);
});
</script>

<template>
  <div id="map"></div>
</template>

<style lang="css">
#map {
  height: calc(100vh - 75px);
}
</style>
