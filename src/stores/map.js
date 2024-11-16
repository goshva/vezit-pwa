import { defineStore } from "pinia";
import axiosInstance from '@/services/axios.js';
import {formatDate} from "@/services/dateFormatter.js";

export const useMapStore = defineStore({
  id: "map",
  state: () => ({
    ads: [], // This will be populated with the videoViews data
    videoViews: [], // This will store the video views fetched from the API
    clicksViews: [], // This will store the video clicks fetched from the API
    showVideoViews: true,
    showClickViews: false,
  }),
  getters: {
    totalVideoViews: (state) => state.videoViews.length,
    totalClickViews: (state) => state.clicksViews.length,
  },
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
        this.updateAds();
      } catch (error) {
        console.error("Failed to fetch video views:", error);
      }
    },
    async fetchClickViews() {
      try {
        const response = await axiosInstance.get('/video-clicks');
        this.clicksViews = response.data;
        this.updateAds();
   
      } catch (error) {
        console.error("Failed to fetch Click views:", error);
      }
    },
    updateAds() {
      // Update `ads` based on which views are enabled
      this.ads = [
        ...(this.showVideoViews ? this.videoViews : []),
        ...(this.showClickViews ? this.clicksViews : []),
      ].map((view) => ({
        id: view.id,
        name: `ID: ${view.video_id}`,
        latlong: [parseFloat(view.latitude), parseFloat(view.longitude)],
        date: formatDate(view.created_at),
        event: view.event,
      }));
    },
    getVideoViewById(id) {
      return this.videoViews.find((view) => view.id === id);
    },
    toggleVideoViews() {
      this.showVideoViews = !this.showVideoViews;
      this.updateAds();
    },
    toggleClickViews() {
      this.showClickViews = !this.showClickViews;
      this.updateAds();
    },
  },
});
