<template>
  <div class="row items-push">
    <BaseBlockOwerView
      v-for="(block, index) in blocks"
      :key="index"
      :block="block"
    />
  </div>
</template>

<script setup>
import BaseBlockOwerView from "@/components/overviews/BaseBlockOwerView.vue"

const blocks = [
  {
    title: "Список актуальных реклам",
    icon: "fa-gem",
    link: "/admin/ads",
    apiUrl: "/video-status-counts",
  },
  {
    title: "Список оборудования",
    icon: "fa-paper-plane",
    link: "/admin/eq",
    apiUrl: "/equipment-status-counts",

  },
  {
    title: "Клиенты",
    icon: "fa-chart-bar",
    link: "/admin/cli",
    apiUrl: "/client-status-counts",
  },
  {
    title: "Список системных ошибок",
    icon: "fa-chart-bar",
    link: "/admin/error",
    apiUrl: "/cfgupdate-status-counts",
  },
  {
    title: "Изменение настроек оборудования",
    icon: "fa-chart-bar",
    link: "/admin/settings",
    apiUrl: "/cfgupdate-log-status-counts",
  },
  {
    title: "Контроль пользователей",
    icon: "fa-chart-bar",
    link: "/admin/control",
    apiUrl: "/user-status-counts",
  },
  {
    title: "Документы",
    icon: "fa-chart-bar",
    link: "/admin/doc",
    apiUrl: "/doc-status-counts",
  },
  {
    title: "Техподдержка",
    icon: "fa-chart-bar",
    link: "/admin/support",
    apiUrl: "/message-status-counts",
  }
];
</script>
