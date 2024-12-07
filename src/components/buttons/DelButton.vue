<script setup>
import { defineProps, defineEmits } from 'vue';
import axiosInstance from "@/services/axios.js";
const emit = defineEmits(['deleted']);
const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
});
const handleDelete = async () => {
    if (confirm("Вы уверены, что хотите удалить рекламную компанию ?")) {
        try {
            await axiosInstance.delete(`${props.path}/${props.id}`);
            emit('deleted');
        } catch (error) {
            console.error(`Error deleting ${props.path}`, error);
        }
    }
};
</script>

<template>
    <div class="d-flex justify-content-evenly">
        <button @click="handleDelete" class="btn btn-sm btn-alt-danger">
            <i class="fa fa-close"></i>
        </button>
    </div>
</template>
