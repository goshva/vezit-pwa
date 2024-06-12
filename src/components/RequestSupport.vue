<script setup>
defineProps(['whoRequestsId'])
</script>

<template>

  <BaseBlock title="Обратная связь" class="m-5">
    <div class="">
      <!-- Sign In Form -->
      <div class="mb-4">
        Задайте свой вопрос:
      </div>
      <div class="mb-4">
        <input
          type="text"
          class="form-control form-control-alt form-control-lg"
          placeholder="Введите вопрос"
        />
      </div>

      <div class="mb-4">
        <strong>Наши контакты:
          8(999)-555-55-55
          example@mail.ru
        </strong>
      </div>

      <div class="mb-4">
        <button type="submit" class="btn w-100 btn-alt-primary">
          <i class=""></i>
          Отправить
        </button>
      </div>
    </div>
  </BaseBlock>

</template>

<style scoped lang="scss">

</style>