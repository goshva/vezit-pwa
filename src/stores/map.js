import { defineStore } from "pinia";
import axiosInstance from '@/services/axios.js';

export const useMapStore = defineStore({
  id: "map",
  state: () => ({
    ads: [], // This will be populated with the videoViews data
    videoViews: [], // This will store the video views fetched from the API
    clicksViews: [], // This will store the video clicks fetched from the API
    showVideoViews: true,
    showClickViews: false,
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
    async fetchClickViews() {
      try {
        const response = await axiosInstance.get('/video-clicks');
        this.clicksViews = response.data;
        
        // Mapping videoViews data into ads
        this.ads = this.videoViews.map(view => ({
          id: view.id,
          name: `Click ID: ${view.video_id}`, // You can customize the name as needed
          latlong: [parseFloat(view.latitude), parseFloat(view.longitude)],
          date: new Date(view.created_at).toLocaleDateString(), // Formatting the date
          event: 'Click View',
          pointerColor: 'red' // Default color, you can customize this as well
        }));
        
      } catch (error) {
        console.error("Failed to fetch Click views:", error);
      }
    },
    getVideoViewById(id) {
      return this.videoViews.find((view) => view.id === id);
    },
    toggleVideoViews() {


      this.showVideoViews = !this.showVideoViews;
      console.log(showVideoViews)
      console.log(showClickViews)
    },
    toggleClickViews() {
      this.showClickViews = !this.showClickViews;
      console.log(showVideoViews)
      console.log(showClickViews)
    },
  },
});
