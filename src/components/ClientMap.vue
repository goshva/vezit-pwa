<script setup>
import leaflet from "leaflet";
import { onMounted } from "vue";
import { useMapStore } from "@/stores/map";

const mapStore = useMapStore();

let map;

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

// Function to calculate the center latitude and longitude
const calculateMapCenter = (ads) => {
  if (ads.length === 0) return [0, 0];

  let totalLat = 0;
  let totalLng = 0;

  ads.forEach((ad) => {
    totalLat += ad.latlong[0];
    totalLng += ad.latlong[1];
  });

  const centerLat = totalLat / ads.length;
  const centerLng = totalLng / ads.length;

  return [centerLat, centerLng];
};

onMounted(async () => {
  // Fetch video views from the API and populate ads
  await mapStore.fetchVideoViews();

  // Calculate center of all ads (video views)
  const mapCenter = calculateMapCenter(mapStore.ads);

  // Initialize the map centered on the calculated point
  map = leaflet.map("map").setView(mapCenter, 10); // Dynamic center based on ads

  mapStore.setMap(map);

  leaflet
    .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      minZoom: 2,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map);

  // Add markers for each ad (video view) on the map
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
