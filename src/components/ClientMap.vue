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

let greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

var blackIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

var redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

var yellowIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

var purpleIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const variables = [greenIcon, blackIcon, redIcon, yellowIcon, purpleIcon];

let randomVariableColor;

const variable = () => {
  const randomIndexColor = Math.floor(Math.random() * variables.length);
  return (randomVariableColor = variables[randomIndexColor]);
};

onMounted(() => {
  map = leaflet.map("map").setView([43, 43], 4);
  mapStore.setMap(map);
  leaflet
    .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      minZoom: 2,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map);

  mapStore.ads.forEach((el) => {
    variable();

    const marker = leaflet
      .marker(el.latlong, { icon: randomVariableColor })
      .bindPopup(`<strong> ${el.name} </strong> <br> ${el.date}`)
      .addTo(map);

    marker.on("click", () => {
      mapStore.selectAd(el.id);
    });
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
