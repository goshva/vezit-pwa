<script setup>
import {ref} from 'vue'
import leaflet from "leaflet";
import ClientMap from "@/components/ClientMap.vue";
import { useMapStore } from "@/stores/map";
const mapStore = useMapStore();

let activePoint = ref(0);

const handleClick = (id) => {
  mapStore.ads.forEach((el) => {
    if (el.id == id) {
      activePoint.value = el.latlong
    }
  });
};

</script>
<template>
  <div class="wrapper">
    <ClientMap :activePoint="activePoint" />
    <div class="right-sidebar">
      <div class="efficiency mb-4">
        <h3>Эффективность за день</h3>
        <p class="d-flex justify-content-between mb-3">
          <span>Переходы / показы</span>
          <span class="fw-semibold">400 / 500</span>
        </p>
        <h2 class="text-end fs-2 fw-semibold mb-0 mt-0">80%</h2>
      </div>

      <div class="event flex-grow-1 d-flex flex-column">
        <div class="d-flex justify-content-end gap-3">
          <button
            class="border-0 bg-transparent d-flex align-items-center gap-2 fw-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              style="width: 24px"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            Сортировка
          </button>
          <button class="border-0 bg-transparent fw-semibold">Фильтр</button>
        </div>
        <div class="flex-grow-1 d-flex flex-column">
          <div class="bg-ping d-flex justify-content-between px-4 py-2">
            <span>Рекл. комп</span>
            <span>Событие</span>
          </div>
          <div
            style="height: 400px"
            class="flex-grow-1 d-flex flex-column p-2 pt-0 border border-1 border-dark border-top-0 flex-nowrap overflow-auto"
          >
            <div
              @click="handleClick(1)"
              style="margin-inline: -8px"
              class="cursor-pointer border-bottom border-dark d-flex justify-content-between align-items-center px-2"
            >
              <span>Магазин цветов</span>
              <span class="text-center"
                >Показ <br />
                (11:00 12.05)</span
              >
            </div>
            <div
              @click="handleClick(2)"
              style="margin-inline: -8px"
              class="cursor-pointer border-bottom border-dark d-flex justify-content-between align-items-center px-2"
            >
              <span>Магазин цветов</span>
              <span class="text-center"
                >Показ <br />
                (11:00 12.05)</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.wrapper {
  background-color: white;
  display: flex;
  padding: 25px;
  gap: 20px;
}
.cursor-pointer {
  cursor: pointer;
}
.right-sidebar {
  min-width: 22vw;
  padding: 15px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
}

.efficiency {
  border: 2px solid black;
  background-color: #dddddd;
  padding: 7px;
}
.bg-ping {
  background-color: #dddddd;
}
</style>
