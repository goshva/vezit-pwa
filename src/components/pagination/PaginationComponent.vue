<script setup>

defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  lastPage: {
    type: Number,
    required: true
  },
});

const emit = defineEmits();

const notifyParent = (page) => {    // Send the event to the parent with the parameter
  emit('page-changed', page);
}
</script>

<template>
  <div class="block-content block-content-full bg-body-light">
    <nav aria-label="Pagination">
      <ul class="pagination pagination-sm justify-content-end mb-0">
        <li class="page-item" v-if="currentPage > 2">
          <a class="page-link" href="javascript:void(0)" @click.prevent="notifyParent(1)" aria-label="Previous">
            <i class="fa fa-chevron-left"></i>
            <i class="fa fa-chevron-left"></i>
          </a>
        </li>
        <li class="page-item" v-if="currentPage > 1">
          <a class="page-link" href="javascript:void(0)" @click.prevent="notifyParent(currentPage - 1)"
             aria-label="Previous">
            <i class="fa fa-chevron-left"></i>
          </a>
        </li>

        <li class="page-item" v-if="currentPage > 2">
          <a class="page-link" href="javascript:void(0)" @click.prevent="notifyParent(currentPage -2)">{{ currentPage -2 }}</a>
        </li>

        <li class="page-item" v-if="currentPage > 1">
          <a class="page-link" href="javascript:void(0)" @click.prevent="notifyParent(currentPage -1)">{{ currentPage -1 }}</a>
        </li>

        <li class="page-item" :class="{ active: true }">
          <a class="page-link" href="javascript:void(0)" @click.prevent="notifyParent(currentPage)">{{ currentPage }}</a>
        </li>

        <li class="page-item" v-if="currentPage < lastPage">
          <a class="page-link" href="javascript:void(0)" @click.prevent="notifyParent(currentPage +1)">{{ currentPage +1 }}</a>
        </li>

        <li class="page-item" v-if="currentPage + 1 < lastPage">
          <a class="page-link" href="javascript:void(0)" @click.prevent="notifyParent(currentPage +2)">{{ currentPage +2 }}</a>
        </li>

        <li class="page-item" v-if="currentPage < lastPage">
          <a class="page-link" href="javascript:void(0)" @click.prevent="notifyParent(currentPage + 1)"
             aria-label="Previous">
            <i class="fa fa-chevron-right"></i>
          </a>
        </li>
        <li class="page-item" v-if="currentPage + 1 < lastPage">
          <a class="page-link" href="javascript:void(0)" @click.prevent="notifyParent(lastPage)"
             aria-label="Next">
            <i class="fa fa-chevron-right"></i>
            <i class="fa fa-chevron-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style>
</style>