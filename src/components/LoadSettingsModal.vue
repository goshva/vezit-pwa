<script setup>

defineProps(['eqId'])

</script>

<template>

  <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
    <i class="fa fa-file-alt ms-1 opacity-25 fs-base"></i>
  </button>

  <div class="modal fade modal-" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Загрузить настройки в {{ eqId }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <div class="mb-3">
            <input class="form-control" type="file" id="formFile">
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
          <button type="submit" class="btn btn-primary">Загрузить</button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">

</style>