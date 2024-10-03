<template>
    <div class="col-sm-6 col-xxl-3">
      <BaseBlock class="d-flex flex-column h-100 mb-0">
        <template #content>
          <div class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center">
            <dl class="mb-0">
              <!-- Display all statuses followed by the sum -->
              <dt class="fs-3 fw-bold">
                <span v-for="(status, index) in blockStatuses" :key="index" class="fs-3 fw-bold">
                  {{ status }}<span v-if="index !== blockStatuses.length - 1 && status !==null"> / </span>
                </span>
                <div v-if="loading">
                  <i class="fas fa-spinner fa-spin"></i>
                </div>
                <span v-else>
                  {{ statusSum }}
                </span>
              </dt>
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
              <span>Подробнее...</span>
              <i class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"></i>
            </RouterLink>
          </div>
        </template>
      </BaseBlock>
    </div>
  </template>
  
  <script setup>
  import { defineProps, computed, ref } from 'vue';
  
  const loading = ref(false);
  
  const props = defineProps({
    block: {
      type: Object,
      required: true
    },
    statuses: {
      type: Object,
      required: true
    }
  });
  
  // Computed to get the statuses for the specific block
  const blockStatuses = computed(() => {
    return Object.values(props.statuses);
  });
  
  // Computed property to calculate the sum of all statuses
  const statusSum = computed(() => {
    return blockStatuses.value.reduce((sum, status) => sum + Number(status || 0), 0);
  });
  </script>
  