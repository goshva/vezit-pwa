<template>
    <div class="modal" :id="`modal-block-edit-${props.id}`" tabindex="-1" role="dialog" 
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <BaseBlock :title="title" transparent class="mb-0">
          <template #options>
            <button type="button" class="btn-block-option" data-bs-dismiss="modal" aria-label="Close" @click="closeModal">
              <i class="fa fa-fw fa-times"></i>
            </button>
          </template>

          <template #content>
            <EditInput
              v-for="field in formFields"
              :key="field.id"
              :modelValue="fieldNames[field.model] ? String(fieldNames[field.model]) : ''"
              :placeholder="field.placeholder"
              :type="field.type"
              :id="field.id"
              :value="formData[field.model]"
              :rules="field.rules"
              @update:modelValue="(value) => updateFieldValue(field.model, value)"
              :error="errors[field.model]?.[0]"
            />

            <div class="mb-4 px-2">
              <button
                type="submit"
                class="btn w-100 btn-alt-primary"
                @click="handleSubmit"
              >
                Отправить
              </button>
            </div>
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import EditInput from "@/components/inputs/EditInput.vue";
import axiosInstance from '@/services/axios.js';
import { useRoute } from "vue-router";
import inputGenerator from '@/services/inputGenerator.js';
import * as bootstrap from 'bootstrap';

const route = useRoute();
const formFields = ref([]);
const errors = ref({});
const emit = defineEmits(["update:fieldNames", "submit", "close"]);
const formData = ref({});

const props = defineProps({
  title: { type: String, required: true },
  fieldNames: {
    type: Object,
    required: true,
  },
  id: { type: Number, required: true },
});

//Функция обновления значения поля формы
const updateFieldValue = (field, value) => {
  formData.value[field] = value;
};

//Функция валидации полей формы
const validateFields = () => {
  errors.value = {};

  for (const field of formFields.value) {
    for (const rule of field.rules) {
      if (!rule(formData.value[field.model])) {
        errors.value[field.model] = [`${field.placeholder} не должно быть пустым или содержит ошибку`];
        break;
      }
    }
  }

  return Object.keys(errors.value).length === 0;
};

//Функция загрузки данных из базы
const fetchAdvertiser = async (id) => {
  try {
    const response = await axiosInstance.get(`${route.path}/${id}`);
    formData.value = response.data;
  } catch (error) {
    console.error("Error fetching video:", error);
  }
};

//Функция генерации полей формы
const generateFormFields = () => {
  formFields.value = inputGenerator(props.fieldNames);
}

const handleSubmit = async () => {
  if (!validateFields()) {
    console.log("Validation failed:", errors.value);
    return;
  }
  try {
    const response = await axiosInstance.put(`${route.path}/${props.id}`, formData.value);
    if (response.status === 200 || response.status === 201) {
      window.location.reload();
      emit("submit", true);
    }
    closeModal();
  } catch (error) {
    if (error.response?.data?.errors) {
      console.error("Ошибки валидации:", error.response.data.errors);
    }
    emit("submit", false);
  }
  
};

onMounted(() => {
  // Генерируем поля формы
  generateFormFields();

  // Если есть id, то загружаем данные из базы
  if (props.id) {
    fetchAdvertiser(props.id);
  }
})

//Функция закрытия модального окна
const closeModal = () => {
  const modalElement = document.getElementById(`modal-block-edit-${props.id}`);
  if (modalElement) {
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }
  }
  emit('close');
};

</script>

<style lang="css">
/* Add any additional styles if needed */
</style>