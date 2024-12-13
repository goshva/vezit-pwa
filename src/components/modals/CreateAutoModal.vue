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
            <FormInput v-for="field in formFields" :key="field.id" :modelValue="fieldNames[field.model]"
              :placeholder="field.placeholder" :type="field.type" :id="field.id" :rules="field.rules"
              @update:modelValue="(value) => updatePartnerValue(field.model, value)"
              :error="errors[field.model]?.[0]" />

            <div class="mb-4">
              <button type="submit" :disabled="!fieldNames.agreeToOffer" class="btn w-100 btn-alt-primary"
                @click="handleSubmit">
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
import { ref } from "vue";
import FormInput from "@/components/inputs/FormInput.vue";

defineProps({
  title: { type: String, required: true },
  fieldNames: {
    type: Object,
    required: true,
  },
  formFields: {
    type: Array,
    required: true,
  },
});

const errors = ref({});

const emit = defineEmits(["update:fieldNames", "submit"]);

const updatePartnerValue = (field, value) => {
  emit("update:fieldNames", { ...fieldNames, [field]: value });
};

const validatePartner = () => {
  errors.value = {};

  for (const field of formFields) {
    for (const rule of field.rules) {
      if (!rule(fieldNames[field.model])) {
        errors.value[field.model] = [`${field.placeholder} не должно быть пустым или содержит ошибку`];
        break;
      }
    }
  }

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = () => {
  if (!validatePartner()) {
    console.log("Validation failed:", errors.value);
    return;
  }
  emit("submit", fieldNames);
};
</script>

<style lang="css">
/* Add any additional styles if needed */
</style>
