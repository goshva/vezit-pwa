<template>
  <button type="button" class="btn btn-primary push" data-bs-toggle="modal" data-bs-target="#modal-block-create">
    <i class="fa-solid fa-plus"></i>
  </button>

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

            <div class="mb-4">
              <button
                type="submit"
                :disabled="!fieldNames.agreeToOffer"
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
import { ref, onMounted} from "vue";
import FormInput from "@/components/inputs/FormInput.vue";
import axiosInstance from '@/services/axios.js';
import { useRoute } from "vue-router";
import inputGenerator from '@/services/inputGenerator.js';

const route = useRoute();
const formFields = ref([]);
const errors = ref({});
const emit = defineEmits(["update:fieldNames", "submit"]);

const props = defineProps({
  title: { type: String, required: true },
  fieldNames: {
    type: Object,
    required: true,
    agreeToOffer: false,
  },
});

const updateFieldValue = (field, value) => {
  emit("update:fieldNames", { ...props.fieldNames, [field]: value });
};

const validateFields = () => {
  errors.value = {};

  for (const field of formFields.value) {
    for (const rule of field.rules) {
      if (!rule(props.fieldNames[field.model])) {
        errors.value[field.model] = [`${field.placeholder} не должно быть пустым или содержит ошибку`];
        break;
      }
    }
  }

  return Object.keys(errors.value).length === 0;
};



const generateFormFields = () => {
  formFields.value = inputGenerator(props.fieldNames);
}



const handleSubmit = async () => {
  const dataToSend = {};

  if (!validateFields()) {
    console.log("Validation failed:", errors.value);
    return;
  }
  // Добавляем все поля в dataToSend
  formFields.value.forEach(field => {
  dataToSend[field.id] = props.fieldNames[field.model];
  });

  // Добавляем статус отдельно, так как он не входит в форму
  dataToSend.status = 4;

  try {
    const response = await axiosInstance.post(route.path, dataToSend);
    if (response.status === 200 || response.status === 201) {
      emit("submit", true);
    }
  } catch (error) {
    if (error.response?.data?.errors) {
      console.error("Ошибки валидации:", error.response.data.errors);
    }
    emit("submit", false);
  }
};

onMounted(() => {
  // Генерируем поля формы
  generateFormFields()
})

</script>

<style lang="css">
/* Add any additional styles if needed */
</style>