<script>
import L from "leaflet";
import mapPointerIcon from "@/assets/map-pointer.svg";
import mapPointerIcon2 from "@/assets/map-pointer2.svg";

const redIcon = new L.Icon({
  iconUrl:
  mapPointerIcon,
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const purpleIcon = new L.Icon({
  iconUrl:
  mapPointerIcon2,
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
// Export an array of all icons
export const icons = [redIcon, purpleIcon];
</script>
