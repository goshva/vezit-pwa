<template>
    <div class="col-md-6 text-center p-3">
        <button @click.prevent="handleDelete" class="btn btn-danger">Удалить</button>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import axiosInstance from "@/services/axios.js";

// Define props
const props = defineProps({
    path: {
        type: String,
        required: true
    }
});

const router = useRouter();

const handleDelete = async () => {
    if (confirm("Вы уверены, что хотите удалить ?")) {
        try {
            await axiosInstance.delete(props.path);
            router.back();
        } catch (error) {
            console.error(`Error deleting ${props.path}`, error);
        }
    }
};
</script>