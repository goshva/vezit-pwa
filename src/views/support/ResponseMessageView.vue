<template>
  <div class="m-5 mb-5">
      <BaseBlock :title="`Ответить на сообщение от ${ticket.user_id}`">

      <template #content>

        <form @submit.prevent="handleSubmit" class="row g-3 m-2 mb-5">
          <div class="col-md-12 mb-3">
            <div class="space-x-1">
              <h3>«{{ ticket.message }}»</h3>
            </div>
          </div>
          <div class="col-md-12 mb-3">
            <label for="filename" class="form-label">Ответ</label>
            <textarea type="text" class="form-control" id="support_answer" v-model="ticket.support_answer" required > </textarea>
          </div>
          <div class="col-md-12 text-center p-3">
            <button type="submit" class="btn btn-primary">Ответить</button>
          </div>
        </form>
      </template>
    </BaseBlock>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axiosInstance from "@/services/axios.js";

const route = useRoute();
const router = useRouter();

const ticket = ref({
  id: null,
  message: "",
  support_answer: "",
  });

const fetchAdDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/messages/${id}`);
    ticket.value = response.data;
  } catch (error) {
    console.error("Error fetching ad details:", error);
  }
};

const handleSubmit = async () => {
  try {
    await axiosInstance.put(`/messages/${route.params.id}`, ticket.value);
    router.push("/support/messages");
  } catch (error) {
    console.error("Error updating ad:", error);
  }
};

onMounted(() => {
  fetchAdDetails(route.params.id);
});
</script>