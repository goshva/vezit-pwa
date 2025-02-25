<template>
    <td class="d-none d-sm-table-cell text-start car-plate">
        <p v-if="plate" class="mb-0">{{plate}}</p>
    </td>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    plate: {
        type: String,
        required: false,
        default: ''
    }
});
</script>

<style lang="scss">
.car-plate p {
  border: 1px solid #ccc;
    border-radius: 5px;
    font-weight: bold;
    display: flex;
    justify-content: center;
}
</style>