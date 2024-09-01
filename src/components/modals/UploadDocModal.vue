<template>
  <button
    type="button"
    class="btn btn-primary push"
    data-bs-toggle="modal"
    data-bs-target="#modal-block-normal"
  >
    <i class="fa-solid fa-plus"></i>
  </button>
  <div
    class="modal"
    id="modal-block-normal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-block-normal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <BaseBlock title="Upload Document" transparent class="mb-0">
          <template #options>
            <button
              type="button"
              class="btn-block-option"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="fa fa-fw fa-times"></i>
            </button>
          </template>

          <template #content>
            <form @submit.prevent="uploadDocument">
              <div class="block-content">
                <div class="mb-3">
                  <label for="userid" class="form-label">User ID</label>
                  <input v-model="form.userid" class="form-control" type="number" id="userid" required />
                </div>
                <div class="mb-3">
                  <label for="filename" class="form-label">Filename</label>
                  <input v-model="form.filename" class="form-control" type="text" id="filename" required />
                </div>
                <div class="mb-3">
                  <label for="serverfilename" class="form-label">Server Filename</label>
                  <input v-model="form.serverfilename" class="form-control" type="text" id="serverfilename" required />
                </div>
                <div class="mb-3">
                  <label for="url" class="form-label">URL</label>
                  <input v-model="form.url" class="form-control" type="text" id="url" required />
                </div>
                <div class="mb-3">
                  <label for="adddate" class="form-label">Add Date</label>
                  <input v-model="form.adddate" class="form-control" type="datetime-local" id="adddate" required />
                </div>
                <div class="mb-3">
                  <label for="enabled" class="form-label">Enabled</label>
                  <select v-model="form.enabled" class="form-control" id="enabled" required>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="doc" class="form-label">Document (PDF)</label>
                  <input @change="handleFileUpload" class="form-control" type="file" id="doc" accept="application/pdf" required />
                </div>
              </div>
              <div class="block-content block-content-full text-end">
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Upload</button>
              </div>
            </form>
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const form = ref({
  userid: '',
  filename: '',
  serverfilename: '',
  url: '',
  adddate: '',
  enabled: '1',
  doc: null,
});

const handleFileUpload = (event) => {
  form.value.doc = event.target.files[0];
};

const uploadDocument = async () => {
  try {
    const formData = new FormData();
    formData.append('userid', form.value.userid);
    formData.append('filename', form.value.filename);
    formData.append('serverfilename', form.value.serverfilename);
    formData.append('url', form.value.url);
    formData.append('adddate', form.value.adddate);
    formData.append('enabled', form.value.enabled);
    formData.append('doc', form.value.doc);

    const response = await axios.post('https://olhar.vit.ooo/api/docs', formData, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vb2xoYXIudml0Lm9vby9hcGkvbG9naW4iLCJpYXQiOjE3MjUxODQyNzYsImV4cCI6MTcyNTE4Nzg3NiwibmJmIjoxNzI1MTg0Mjc2LCJqdGkiOiI5OWFQdERpTHpPeEk3b2o0Iiwic3ViIjoiMzU2IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.RQ-moOsVza9NMZoBgI9Lo8iLQO6jX75VhI7NUPY-nqA',
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Document uploaded successfully:', response.data);
    // You can handle the success response here, like showing a success message
  } catch (error) {
    console.error('Error uploading document:', error);
    // Handle the error, possibly showing an error message to the user
  }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
