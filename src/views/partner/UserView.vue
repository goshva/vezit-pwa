<template>
  <BaseBlock title="Данные о компании партнера" class="m-5">
    <div>
      <FormInput
        v-for="field in formFields"
        :key="field.id"
        :modelValue="partner[field.model]"
        :placeholder="field.placeholder"
        :type="field.type"
        :id="field.id"
        :rules="field.rules"
        @update:modelValue="(value) => (partner[field.model] = value)"
        :error="errors[field.model]?.[0]"
      />

      <div class="mb-2">
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="checkbox" 
            id="agreeToOffer" 
            v-model="partner.agreeToOffer" 
          />
          <label class="form-check-label" for="agreeToOffer">Я согласен с договором оферты</label>
        </div>
      </div>

      <div class="mb-4">
        <button 
          type="submit"
          :disabled="!partner.agreeToOffer" 
          class="btn w-100 btn-alt-primary" 
          @click="handleSubmit"
        >
          Отправить
        </button>
      </div>
    </div>
  </BaseBlock>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axiosInstance from "@/services/axios.js";
import FormInput from "@/components/inputs/FormInput.vue";

const route = useRoute();
const router = useRouter();

const partner = ref({
  name: "",
  bussines: "",
  description: "",
  OGRN: "",
  BIK: "",
  INN: "",
  OKVED: "",
  legalAddress: "",
  actualAddress: "",
  contactName: "",
  contactTel: "",
  contactEMail: "",
  agreeToOffer: false,
});

const errors = ref({});

const formFields = [
  { id: "name", placeholder: "Название", type: "text", model: "name", rules: [(val) => val?.trim() !== ""] },
  { id: "INN", placeholder: "ИНН", type: "text", model: "INN", rules: [(val) => val?.trim().length <= 13] },
  { id: "BIK", placeholder: "БИК", type: "text", model: "BIK", rules: [(val) => val?.trim().length <= 9] },
  { id: "OGRN", placeholder: "ОГРН/ОГРИП", type: "text", model: "OGRN", rules: [(val) => val?.trim().length <= 15] },
  { id: "bussines", placeholder: "Название компании", type: "text", model: "bussines", rules: [(val) => val?.trim() !== ""] },
  { id: "description", placeholder: "Описание компании", type: "text", model: "description", rules: [(val) => val?.trim() !== ""] },
  { id: "contactName", placeholder: "Директор (ФИО)", type: "text", model: "contactName", rules: [(val) => val?.trim() !== ""] },
  { id: "legalAddress", placeholder: "Юридический адрес", type: "text", model: "legalAddress", rules: [(val) => val?.trim().length <= 512] },
  { id: "actualAddress", placeholder: "Фактический адрес", type: "text", model: "actualAddress", rules: [(val) => val?.trim().length <= 512] },
  { id: "OKVED", placeholder: "Вид деятельности", type: "text", model: "OKVED", rules: [(val) => val?.trim().length <= 512] },
  { id: "contactTel", placeholder: "Контактный телефон", type: "text", model: "contactTel", rules: [(val) => val?.trim() !== ""] },
  { id: "contactEMail", placeholder: "Электронная почта", type: "email", model: "contactEMail", rules: [(val) => /^\S+@\S+\.\S+$/.test(val)] },
];

const validatePartner = () => {
  errors.value = {};

  for (const field of formFields) {
    for (const rule of field.rules) {
      if (!rule(partner.value[field.model])) {
        errors.value[field.model] = [` ${field.placeholder} не должно быть пустым или содержит ошибку`];
        break;
      }
    }
  }

  return Object.keys(errors.value).length === 0;
};

const fetchAdDetails = async () => {
  try {
    const response = await axiosInstance.get(route.path);
    if (response.data && response.data.data) {
      partner.value = response.data.data;
    }
  } catch (error) {
    console.error("Error fetching partner details:", error);
  }
};

const handleSubmit = async () => {
  if (!validatePartner()) {
    console.log("Validation failed:", errors.value);
    return;
  }

  try {
    const response = await axiosInstance.post(route.path, partner.value);
    router.push("/Pdashboard");
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error("Error updating partner:", error);
    }
  }
};

onMounted(() => {
  fetchAdDetails();
});
</script>
