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
        <BaseBlock title="Upload Video" transparent class="mb-0">
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
            <form>
              <div class="block-content">
                <input class="form-control" type="file" id="videoId" />
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
<script setup></script>
<style lang="css"></style>
