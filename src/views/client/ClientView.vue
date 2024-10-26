<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/services/axios.js';

// State for client form data
const clientForm = ref({
  name: null,
  bussines: null,
  description: null,
  OGRN: null,
  BIK: null,
  contactName: null,
  contactTel: null,
  contactEMail: null,
  status: 0,
});

const loading = ref(false);

// Function to create or edit client data
const saveClient = async () => {
  loading.value = true;
  try {
    const response = await axiosInstance.post(`/client`, clientForm.value);
    console.log('Client saved successfully:', response.data);
    // loading.value = false;
    // You can handle success response here, e.g., show a message, reset form, etc.
  } catch (error) {
    console.error('Error saving client:', error);
    // loading.value = false;
    // Handle the error, e.g., show a notification
  } finally {
    loading.value = false;
  }
};

// Fetch existing client data if editing
const fetchClient = async (clientId) => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(`/client/${clientId}`);
    clientForm.value = response.data.data; // Assuming the API returns the client object
  } catch (error) {
    console.error('Error fetching client:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchClient(); 
});

</script>

<template>
  <BaseBlock title="Данные о компании клиента" class="m-5">
    <div>
      <!-- Client Form -->
      <div class="mb-4">
        <input v-model="clientForm.name" type="text" class="form-control form-control-alt form-control-lg"
          placeholder="Название компании" />
      </div>

      <div class="mb-4">
        <input v-model="clientForm.OGRN" type="text" class="form-control form-control-alt form-control-lg"
          placeholder="ОГРН" />
      </div>

      <div class="mb-4">
        <input v-model="clientForm.BIK" type="text" class="form-control form-control-alt form-control-lg"
          placeholder="BIK" />
      </div>

      <div class="mb-4">
        <input v-model="clientForm.contactName" type="text" class="form-control form-control-alt form-control-lg"
          placeholder="Контактное лицо" />
      </div>

      <div class="mb-4">
        <input v-model="clientForm.contactTel" type="text" class="form-control form-control-alt form-control-lg"
          placeholder="Телефон" />
      </div>

      <div class="mb-4">
        <input v-model="clientForm.contactEMail" type="email" class="form-control form-control-alt form-control-lg"
          placeholder="Электронная почта" />
      </div>

      <div class="mb-4">
        <textarea v-model="clientForm.description" class="form-control form-control-alt form-control-lg"
          placeholder="Описание клиента"></textarea>
      </div>

      <div class="mb-4">
        <button type="button" class="btn w-100 btn-alt-primary" @click="saveClient" :disabled="loading">
          <i class="fas fa-save"></i> {{ loading ? 'Сохранение...' : 'Отправить' }}
        </button>
      </div>
    </div>
  </BaseBlock>
</template>

<style lang="scss"></style>
