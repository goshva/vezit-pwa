<script setup>
import leaflet from "leaflet";
import { onMounted, watch } from "vue";
import { useMapStore } from "@/stores/map";
import { icons } from "@/components/MapIcons.vue"; // Import icons array
const mapStore = useMapStore();
let map;
let markers = [];
const clearMarkers = () => {
  markers.forEach((marker) => marker.remove());
  markers = [];
};
const addMarkers = () => {
  clearMarkers();
  mapStore.ads.forEach((ad) => {
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const marker = leaflet
      .marker(ad.latlong, { icon: randomIcon })
      .bindPopup(`<strong>${ad.name}</strong><br>${ad.date}`)
      .addTo(map);

    marker.on("click", () => {
      mapStore.selectAd(ad.id);
    });

    markers.push(marker);
  });
};
watch(
  () => [mapStore.showVideoViews, mapStore.showClickViews],
  () => {
    mapStore.updateAds(); // Update ads in store
    addMarkers(); // Redraw markers
  }
);
const getRandomIcon = () => icons[Math.floor(Math.random() * icons.length)];

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
  await mapStore.fetchClickViews();

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

    addMarkers();
});
</script>

<template>
  <div id="map"></div>
</template>

<style lang="css">
#map {
  width: 100%;
  height: calc(100vh - 115px);
}
</style>
