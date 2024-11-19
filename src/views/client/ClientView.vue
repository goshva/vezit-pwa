<script setup>
import { ref, onMounted } from "vue";
import { useClientStore } from "@/stores/client"; // Import the Pinia store
import FormInput from "@/components/inputs/FormInput.vue";

const clientStore = useClientStore(); // Use the client Pinia store
const errors = ref({});
const loading = ref(false);

const formFields = [
  { id: "name", placeholder: "Название компании", type: "text", model: "name", rules: [(val) => val?.trim() !== ""] },
  { id: "bussines", placeholder: "Бизнес", type: "text", model: "bussines", rules: [(val) => val?.trim() !== ""] },
  { id: "OGRN", placeholder: "OGRN", type: "text", model: "OGRN", rules: [(val) => val?.trim() !== ""] },
  { id: "BIK", placeholder: "BIK", type: "text", model: "BIK", rules: [(val) => val?.trim() !== ""] },
  { id: "contactName", placeholder: "Контактное лицо", type: "text", model: "contactName", rules: [(val) => val?.trim() !== ""] },
  { id: "contactTel", placeholder: "Телефон", type: "text", model: "contactTel", rules: [(val) => val?.trim() !== ""] },
  { id: "contactEMail", placeholder: "Электронная почта", type: "email", model: "contactEMail", rules: [(val) => /^\S+@\S+\.\S+$/.test(val)] },
];

const validateClientForm = () => {
  errors.value = {};

  for (const field of formFields) {
    for (const rule of field.rules) {
      if (!rule(clientStore[field.model])) {
        errors.value[field.model] = ` ${field.placeholder} не должно быть пустым или содержит ошибку`;
        break;
      }
    }
  }

  return Object.keys(errors.value).length === 0;
};

const saveClient = async () => {
  if (!validateClientForm()) {
    console.error("Validation failed:", errors.value);
    return;
  }

  loading.value = true;
  try {
    await clientStore.saveClient();
  } catch (error) {
    console.error("Error saving client:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  clientStore.fetchClientProfile();
});
</script>

<template>
  <BaseBlock title="Данные о компании клиента" class="m-5">
    <div>
      <FormInput
        v-for="field in formFields"
        :key="field.id"
        :id="field.id"
        :placeholder="field.placeholder"
        :type="field.type"
        :modelValue="clientStore[field.model]"
        @update:modelValue="(value) => (clientStore[field.model] = value)"
        :error="errors[field.model]"
      />

      <div class="mb-4">
        <textarea 
          v-model="clientStore.description" 
          class="form-control form-control-alt form-control-lg" 
          placeholder="Описание клиента"
        ></textarea>
        <div v-if="errors.description" class="text-danger">{{ errors.description }}</div>
      </div>

      <div class="mb-4">
        <button 
          type="button" 
          class="btn w-100 btn-alt-primary" 
          @click="saveClient" 
          :disabled="loading"
        >
          <i class="fas fa-save"></i> {{ loading ? "Сохранение..." : "Отправить" }}
        </button>
      </div>
    </div>
  </BaseBlock>
</template>

<style lang="scss"></style>
