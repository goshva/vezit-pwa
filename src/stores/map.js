import { defineStore } from "pinia";

export const useMapStore = defineStore({
  id: "map",
  state: () => ({
    ads: [
      {
        id: Math.random() * 100,
        name: "Web digital Studio",
        latlong: [40, 41],
        date: '23-05-2024',
      },
      {
        id: Math.random() * 100,
        name: "Copy club",
        latlong: [42, 42],
        date: '22-05-2024',
      },
      {
        id: Math.random() * 100,
        name: "Alfa&Omega",
        latlong: [43, 43],
        date: '21-05-2024',
      },
    ],
  }),
  actions: {},
});
