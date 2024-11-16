<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    routeName: {
        type: String,
        required: true,
    },
    status: {
    type: Number,
    required: false,
  },
});

const router = useRouter();

const navigateToEdit = () => {
    router.push({ name: props.routeName, params: { id: props.id, status: props.status } });
};
</script>

<template>
    <div class="d-flex justify-content-evenly">
        <button @click="navigateToEdit" class="btn btn-sm btn-alt-primary">
            <i class="fa fa-edit"></i>
        </button>
    </div>
</template>
