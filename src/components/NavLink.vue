<template>
  <RouterLink 
    class="nav_link" 
    :to="link" 
    active-class="active-link" 
    @click="handleClick"
  >
    {{ name }}
  </RouterLink>
</template>

<script setup>
defineProps({
  link: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const emit = defineEmits();

function handleClick(event) {
  emit('click', event);
}
</script>

<style scoped>
.nav_link {
}
</style>