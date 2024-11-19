<script setup>
import { ref } from 'vue';
import axiosInstance from '@/services/axios.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const imageFile = ref(null);

function handleFileUpload(event) {
  imageFile.value = event.target.files[0];
}

async function submitImage() {
  if (!imageFile.value) return;

  let formData = new FormData();
  formData.append('image', imageFile.value);

  try {
    await axiosInstance.post('/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    router.back();
  } catch (error) {
    console.error('Upload error:', error);
  }
}
</script>

<template>
  <button type="button" class="btn btn-primary push" data-bs-toggle="modal" data-bs-target="#modal-block-normal">
    <i class="fa-solid fa-plus"></i>
  </button>
  <div class="modal" id="modal-block-normal" tabindex="-1" role="dialog" aria-labelledby="modal-block-normal"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <BaseBlock title="Загрузите фото чека об оплате" transparent class="mb-0">
          <template #options>
            <button type="button" class="btn-block-option" data-bs-dismiss="modal" aria-label="Close">
              <i class="fa fa-fw fa-times"></i>
            </button>
          </template>
          <template #content>
            <div class="block-content">
              <div class="mb-3">
                <input class="form-control" type="file" @change="handleFileUpload" />
              </div>
            </div>
            <div class="block-content block-content-full text-end">
              <button @click="submitImage" type="submit" class="btn btn-primary" data-bs-dismiss="modal">Отправить</button>
            </div>
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>
