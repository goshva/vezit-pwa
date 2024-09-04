<template>
    <div class="row items-push">
      <div v-for="(block, index) in blocks" :key="index" class="col-sm-6 col-xxl-3">
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center">
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">{{ block.count }}</dt>
                <dd class="fs-sm fw-medium text-muted mb-0">{{ block.title }}</dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i :class="`fa ${block.icon} fs-3 text-primary`"></i>
              </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <RouterLink
                class="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between"
                :to="block.link"
              >
                <span>{{ block.linkText }}</span>
                <i class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"></i>
              </RouterLink>
            </div>
          </template>
        </BaseBlock>
      </div>
    </div>
  </template>
  
  <script setup>
  const blocks = [
    {
      count: 32,
      title: "Список актуальных реклам",
      icon: "fa-gem",
      link: "/admin/ads",
      linkText: "View all orders"
    },
    {
      count: 45,
      title: "Список оборудования",
      icon: "fa-paper-plane",
      link: "/admin/eq",
      linkText: "View all broke"
    },
    {
      count: 4,
      title: "Клиенты",
      icon: "fa-chart-bar",
      link: "/admin/cli",
      linkText: "View all clients"
    },
    {
      count: 60,
      title: "Список системных ошибок",
      icon: "fa-chart-bar",
      link: "/admin/error",
      linkText: "View all errors"
    },
    {
      count: 70,
      title: "Изменение настроек оборудования",
      icon: "fa-chart-bar",
      link: "/admin/settings",
      linkText: "View all settings"
    },
    {
      count: 90,
      title: "Контроль пользователей",
      icon: "fa-chart-bar",
      link: "/admin/control",
      linkText: "View all users"
    },
    {
      count: 100,
      title: "Финансы и документы",
      icon: "fa-chart-bar",
      link: "/admin/doc",
      linkText: "View statistics"
    },
    {
      count: 90,
      title: "Техподдержка",
      icon: "fa-chart-bar",
      link: "/admin/support",
      linkText: "View all questions"
    }
  ];
  </script>
  