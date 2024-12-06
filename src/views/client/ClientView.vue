<script setup>
import { ref, onMounted, watch } from 'vue';
import axiosInstance from '@/services/axios.js';

// State for client form data
const clientForm = ref({
  name: null,
  business: null,
  OGRN: null,
  BANK: null,
  BIK: null,
  contactName: null,
  contactTel: null,
  directorName: null,
  directorTel: null,
  contactEmail: null,
  description: null,
  status: 0,
  publicOfferConsent: false,
});

const copyContactToDirectorChecked = ref(false);
const loading = ref(false);

// Function to create or edit client data
const saveClient = async () => {
    if (!clientForm.value.name || !clientForm.value.contactTel || !clientForm.value.contactName) {
    alert("Пожалуйста, заполните обязательные поля.");
    return;
  }
  loading.value = true;
  try {
    const response = await axiosInstance.post(`/client`, clientForm.value);
    console.log('Client saved successfully:', response.data);
  } catch (error) {
    console.error('Error saving client:', error);
  } finally {
    loading.value = false;
  }
};

// Fetch existing client data if editing
const fetchClient = async () => {
  loading.value = true;
  try {
    const response = await axiosInstance.get(`/client/`);
    if (response.data.data !== null) {
      clientForm.value = response.data.data;
    }
  } catch (error) {
    console.error('Error fetching client:', error);
  } finally {
    loading.value = false;
  }
};

// Watcher to update director data when the checkbox is checked
watch(copyContactToDirectorChecked, (newValue) => {
  if (newValue) {
    clientForm.value.directorName = clientForm.value.contactName;
    clientForm.value.directorTel = clientForm.value.contactTel;
  }  else {
    clientForm.value.directorName = null;
    clientForm.value.directorTel = null;
  }
});

onMounted(() => {
    fetchClient()
});

</script>

<template>
  <BaseBlock title="Данные о компании клиента" class="m-5">
    <div>
       <!-- Client Form -->
      <div class="mb-4">
        <input v-model="clientForm.name" type="text" class="form-control form-control-alt form-control-lg"
          placeholder="Наименование компании" />
      </div>

      <div class="mb-4">
        <input v-model="clientForm.business" type="text" class="form-control form-control-alt form-control-lg"
          placeholder="Вид деятельности" />
      </div>

      <div class="mb-4">
        <input v-model="clientForm.OGRN" type="text" class="form-control form-control-alt form-control-lg"
          placeholder="ОГРН/ОГРНИП" />
      </div>

      <div class="mb-4">
        <input v-model="clientForm.BANK" type="text" class="form-control form-control-alt form-control-lg"
          placeholder="Р/с" />
      </div>

      <div class="mb-4">
        <input v-model="clientForm.BIK" type="text" class="form-control form-control-alt form-control-lg"
          placeholder="БИК" />
      </div>

      <div class="mb-4">
        <input v-model="clientForm.contactName" type="text" class="form-control form-control-alt form-control-lg"
          placeholder="Контактное лицо" />
      </div>

      <div class="mb-4">
        <input v-model="clientForm.contactTel" type="text" class="form-control form-control-alt form-control-lg"
          placeholder="Телефон контактного лица" />
      </div>

            <!-- Checkbox to copy contact data -->
      <div class="mb-4 form-check">
        <input v-model="copyContactToDirectorChecked" type="checkbox" id="copyContactToDirector" class="form-check-input" />
        <label for="copyContactToDirector" class="form-check-label">
          Заполнить ФИО и телефон руководителя, если совпадают с контактным лицом
        </label>
      </div>

            <div class="mb-4">
        <input v-model="clientForm.directorName" type="text" class="form-control form-control-alt form-control-lg"
          placeholder="ФИО руководителя" />
      </div>

      <div class="mb-4">
        <input v-model="clientForm.directorTel" type="text" class="form-control form-control-alt form-control-lg"
          placeholder="Телефон руководителя" />
      </div>

      <div class="mb-4">
        <input v-model="clientForm.contactEmail" type="email" class="form-control form-control-alt form-control-lg"
          placeholder="Электронная почта" />
      </div>

      <div class="mb-4">
        <textarea v-model="clientForm.description" class="form-control form-control-alt form-control-lg"
          placeholder="Описание деятельности"></textarea>
      </div>

      <!-- Checkbox for public offer consent -->
      <div class="mb-4 form-check">
        <input v-model="clientForm.publicOfferConsent" type="checkbox" id="publicOfferConsent" class="form-check-input" />
        <label for="publicOfferConsent" class="form-check-label">
          Согласие на публичную оферту
        </label>
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
