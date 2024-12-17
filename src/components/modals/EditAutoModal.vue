<template>
  <div class="d-flex justify-content-evenly">
        <button class="btn btn-sm btn-alt-primary">
            <i class="fa fa-edit"></i>
        </button>
    </div>

  <div class="modal" id="modal-block-create" tabindex="-1" role="dialog" aria-labelledby="modal-block-create"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <BaseBlock :title=title transparent class="mb-0">
          <template #options>
            <button type="button" class="btn-block-option" data-bs-dismiss="modal" aria-label="Close">
              <i class="fa fa-fw fa-times"></i>
            </button>
          </template>

          <template #content>
            <FormInput
              v-for="field in formFields"
              :key="field.id"
              :modelValue="fieldNames[field.model] ? String(fieldNames[field.model]) : ''"
              :placeholder="field.placeholder"
              :type="field.type"
              :id="field.id"
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
import { useRoute, useRouter } from "vue-router";
import axiosInstance from "@/services/axios.js";
import FormInput from "@/components/inputs/FormInput.vue";
import RemoveData from "@/components/RemoveData.vue";
import inputGenerator from '@/services/inputGenerator.js';

const route = useRoute();
const router = useRouter();
const formFields = ref([]);
const formData = ref({});
const errors = ref({});

const props = defineProps({
  fieldNames: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

const updateFieldValue = (field, value) => {
  formData.value[field] = value;
};

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

const handleSubmit = async () => {
  if (!validateFields()) {
    console.log("Validation failed:", errors.value);
    return;
  }

  try {
    const response = await axiosInstance.put(`${route.path}`, formData.value);
    if (response.status === 200) {
      router.back();
    }
  } catch (error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors;
    }
    console.error("Error updating data:", error);
  }
};

const handleDelete = () => {
  router.back();
};

const fetchData = async () => {
  try {
    const response = await axiosInstance.get(route.path);
    formData.value = response.data;
    formFields.value = inputGenerator(response.data);
    title.value = route.name.replace('AdminEdit', '');
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  // fetchData();
});
</script>