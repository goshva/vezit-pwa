import { defineStore } from "pinia";
import axiosInstance from '@/services/axios.js';

export const useMapStore = defineStore({
  id: "map",
  state: () => ({
    ads: [], // This will be populated with the videoViews data
    videoViews: [], // This will store the video views fetched from the API
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
      this.selectedColor = "#d7d7d7";
    },
    async fetchVideoViews() {
      try {
        const response = await axiosInstance.get('/video-views');
        this.videoViews = response.data;
        
        // Mapping videoViews data into ads
        this.ads = this.videoViews.map(view => ({
          id: view.id,
          name: `Video ID: ${view.video_id}`, // You can customize the name as needed
          latlong: [parseFloat(view.latitude), parseFloat(view.longitude)],
          date: new Date(view.created_at).toLocaleDateString(), // Formatting the date
          event: 'Video View',
          pointerColor: 'blue' // Default color, you can customize this as well
        }));
        
      } catch (error) {
        console.error("Failed to fetch video views:", error);
      }
    },
    getVideoViewById(id) {
      return this.videoViews.find((view) => view.id === id);
    },
  },
});
