<script setup>
import QrcodeVue from "qrcode.vue";
</script>
<template>
  <BaseBlock title="Данные о рекдамодателе" class="m-5">
    <div>
      <!-- Sign In Form -->е
      <div class="mb-4">
        <input
          type="text"
          class="form-control form-control-alt form-control-lg"
          placeholder="ИНН"
        />
      </div>

      <div class="mb-4">
        <input
          type="text"
          class="form-control form-control-alt form-control-lg"
          placeholder="ОГРН/ОГРИП"
        />
      </div>

      <div class="mb-4">
        <input
          type="text"
          class="form-control form-control-alt form-control-lg"
          placeholder="Название компании"
        />
      </div>

      <div class="mb-4">
        <input
          type="text"
          class="form-control form-control-alt form-control-lg"
          placeholder="Директор(ФИО)"
        />
      </div>

      <div class="mb-4">
        <input
          type="text"
          class="form-control form-control-alt form-control-lg"
          placeholder="Адрес"
        />
      </div>

      <div class="mb-4">
        <input
          type="text"
          class="form-control form-control-alt form-control-lg"
          placeholder="Вид деятельности"
        />
      </div>
      <div class="mb-4">
        <label class="form-label ml-2" for="example-file-input"
          >Добавить видео</label
        >
        <input
          class="form-control form-control-alt form-control-lg"
          type="file"
          id="example-file-input"
        />
      </div>

      <div class="mb-4">
        <qrcode-vue value="https://example.com" size="100" level="H" />
      </div>

      <div class="mb-4">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="login-remember"
            name="login-remember"
          />
          <label class="form-check-label" for="login-remember"
            >Создать договор</label
          >
        </div>
      </div>

      <div class="mb-4">
        <button type="submit" class="btn w-100 btn-alt-primary">
          <i class=""></i>
          Отправить
        </button>
      </div>
    </div>
    <!-- END Sign In Form -->
  </BaseBlock>
  <!-- END Recent Orders -->
</template>

<style lang="scss"></style>
