<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: calc(100vh - 100px)"
    ref="map"
  >
    <ol-view
      ref="view"
      :center="center"
      :zoom="zoom"
      :projection="projection"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <!--Current geolocation-->
    <ol-geolocation :projection="projection" @change:position="geoLocChange">
      <template>
        <ol-vector-layer :zIndex="2">
          <ol-source-vector>
            <ol-feature ref="positionFeature">
              <ol-geom-point :coordinates="currentPosition"></ol-geom-point>
              <ol-style>
                <ol-style-stroke color="red" :width="2"></ol-style-stroke>
                <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>
                <ol-style-icon scale="1">
                  <span class="marker">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      :fill="randomColor(0)"
                      viewBox="0 0 24 24"
                      strokeWidth="{1.5}"
                      stroke="currentColor"
                      style="width: 36px; height: 36px"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                  </span>
                </ol-style-icon>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>
      </template>
    </ol-geolocation>

    <!--Other geolocation-->
    <ol-geolocation
      :projection="projection"
      @change:position="geoLocChange"
      v-for="item in arr"
      :key="item"
    >
      <template>
        <ol-vector-layer :zIndex="item">
          <ol-source-vector>
            <ol-feature ref="positionFeature">
              <ol-geom-point :coordinates="[item, item]"></ol-geom-point>
              <ol-style>
                <ol-style-stroke color="red" :width="2"></ol-style-stroke>
                <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>
                <ol-style-icon scale="1">
                  <span class="marker">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      :fill="randomColor(item)"
                      viewBox="0 0 24 24"
                      strokeWidth="{1.5}"
                      stroke="currentColor"
                      style="width: 36px; height: 35px"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                  </span>
                </ol-style-icon>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>
      </template>
    </ol-geolocation>
  </ol-map>
</template>

<script setup>
import { ref } from "vue";

const center = ref([43.905518, 42.715718]);
const projection = ref("EPSG:4326");
const zoom = ref(3);
const view = ref();
const map = ref(null);

const arr = Array.from({ length: 6 }, (v, k) => {
  return Math.random(k) * 100;
});

const randomColor = (num) => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random(num) * 16)];
  }
  return color;
};

//current
const currentPosition = ref([]);

//custom
const position = ref([43.905518, 42.715718]);
const position2 = ref([43, 43]);
const position3 = ref([44, 44]);
const position4 = ref([45, 45]);
const position5 = ref([47, 47]);
const position6 = ref([46, 46]);

const geoLocChange = (event) => {
  //   console.log("AAAAA", event);
  currentPosition.value = event.target.getPosition();
  view.value?.setCenter(event.target?.getPosition());
};
</script>
