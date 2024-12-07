<template>
    <div class="col-md-6 text-center p-3">
        <button @click.prevent="handleSubmit" type="submit" class="btn btn-primary">Сохранить изменения</button>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import axiosInstance from "@/services/axios.js";

// Define props
const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    path: {
        type: String,
        required: true
    }
});

const router = useRouter();

const handleSubmit = async () => {
    try {
        console.log(props.data);
        await axiosInstance.put(props.path, props.data);
        router.back();
    } catch (error) {
        console.error("Error updating user:", error);
    }
};
</script>