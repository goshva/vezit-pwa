<template>
  <button
    type="button"
    class="btn btn-primary push mb-0"
    data-bs-toggle="modal"
    data-bs-target="#modal-block-normal-2"
  >
    <i class="fa-solid fa-circle-play"></i>
  </button>
  <div
    class="modal"
    id="modal-block-normal-2"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-block-normal-2"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <BaseBlock title="Video name" transparent class="text-start mb-0">
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
            <div class="block-content fs-sm">
              <video
                width="100%"
                height="100%"
                src="https://olhar.vit.ooo////storage//videos//5d0aaf16-4570-4c31-b36f-2f4226641af5.mp4"
                controls
                frameborder="0"
              ></video>
            </div>
            <div class="block-content block-content-full text-end bg-body">
              <button
                type="button"
                class="btn btn-sm btn-alt-secondary me-1"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="css"></style>
