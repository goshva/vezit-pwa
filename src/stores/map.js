import { defineStore } from "pinia";

export const useMapStore = defineStore({
  id: "map",
  state: () => ({
    ads: [
      {
        id: 1,
        name: "Web digital Studio",
        latlong: [40, 41],
        date: "23-05-2024",
      },
      {
        id: 2,
        name: "Copy club",
        latlong: [42, 42],
        date: "22-05-2024",
      },
      {
        id: 3,
        name: "Alfa&Omega",
        latlong: [43, 43],
        date: "21-05-2024",
      },
    ],
  }),
  actions: {
    setMap(mapInstance) {
      this.map = mapInstance;
    },
    zoomTo(lat, long) {
      if (this.map) {
        this.map.setView([lat, long], 18);
      }
    },
    getAdById(id) {
      return this.ads.find((ad) => ad.id === id);
    },
    selectAd(id) {
      this.selectedAd = id;
      this.selectedColor = "#85fff3";
    },
  },
});
