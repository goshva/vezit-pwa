<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTemplateStore } from "@/stores/template";
import { useUserStore } from '@/stores/user'; // Import the user store from Pinia
const userStore = useUserStore();
const username = computed(() => userStore.username);
const roleName = computed(() => userStore.roleName);
const handleChangeRole = (rolePath) => {
  router.push(`/${rolePath}`);
};
const store = useTemplateStore();
const router = useRouter();
const { path } = useRoute();

let isShow = ref(false);

onMounted(() => {
  isShow.value = path.includes("/moderator") || path.includes("/client") || path.includes("/partner");
});


</script>

<template>
  <!-- Header -->
  <header id="page-header">
    <slot>
      <!-- Header Content -->
      <div class="content-header">
        <slot name="content">
          <!-- Left Section -->
          <div class="d-flex align-items-center">
            <slot name="content-left">
              <!-- Toggle Sidebar -->
              <button type="button" class="btn btn-sm btn-alt-secondary me-2 d-lg-none"
                @click="store.sidebar({ mode: 'toggle' })">
                <i class="fa fa-fw fa-bars"></i>
              </button>
              <!-- END Toggle Sidebar -->

              <!-- Open Search Section (visible on smaller screens) -->
              <button type="button" class="btn btn-sm btn-alt-secondary d-md-none"
                @click="store.headerSearch({ mode: 'on' })">
                <i class="fa fa-fw fa-search"></i>
              </button>
              <!-- END Open Search Section -->
            </slot>
          </div>
          <!-- END Left Section -->

          <!-- Right Section -->
          <div class="d-flex align-items-center">
            <slot name="content-right">
              <div class="d-inline-block" v-if="isShow">
                <p class="m-0" id="page-header-user-dropdown"><strong>5 000 </strong> ₽</p>
              </div>

              <!-- User Dropdown -->
              <div class="dropdown d-inline-block ms-2">
                <button type="button" class="btn btn-sm btn-alt-secondary d-flex align-items-center"
                  id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img class="rounded-circle" src="/assets/media/avatars/avatar10.jpg" alt="Header Avatar"
                    style="width: 21px" />
                  <span class="d-none d-sm-inline-block ms-2">{{ username }}</span>
                  <i class="fa fa-fw fa-angle-down d-none d-sm-inline-block opacity-50 ms-1 mt-1"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-md dropdown-menu-end p-0 border-0"
                  aria-labelledby="page-header-user-dropdown">
                  <div class="p-3 text-center bg-body-light border-bottom rounded-top">
                    <img class="img-avatar img-avatar48 img-avatar-thumb" src="/assets/media/avatars/avatar10.jpg"
                      alt="Header Avatar" />
                    <p class="mt-2 mb-0 fw-medium">{{ username }}</p>
                    <p class="mb-0 text-muted fs-sm fw-medium">{{ roleName }}</p>
                  </div>
                  <div role="separator" class="dropdown-divider m-0"></div>
                  <div class="p-2">
                    <RouterLink :to="{ name: 'auth-signin' }"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs-sm fw-medium">Выйти</span>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <!-- END User Dropdown -->
              <!--Role Dropdown-->
              <div class="dropdown d-inline-block ms-2">
                <button type="button" class="btn btn-sm btn-alt-secondary d-flex align-items-center"
                  id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span class="d-sm-inline-block ms-2">Role</span>
                  <i class="fa fa-fw fa-angle-down d-sm-inline-block opacity-50 ms-1 mt-1"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-md dropdown-menu-end p-0 border-0"
                  aria-labelledby="page-header-user-dropdown">
                  <div class="p-2">
                    <RouterLink class="dropdown-item d-flex align-items-center justify-content-between"
                      to="/admin/dashboard">
                      <span class="fs-sm fw-medium">Администратор</span>
                    </RouterLink>
                    <button @click="handleChangeRole('moderator/dashboard')"
                      class="dropdown-item d-flex align-items-center justify-content-between">
                      <span class="fs-sm fw-medium">Модератор</span>
                    </button>
                    <button class="dropdown-item d-flex align-items-center justify-content-between"
                      @click="handleChangeRole('client/dashboard')">
                      <span class="fs-sm fw-medium">Клиент</span>
                    </button>
                    <button class="dropdown-item d-flex align-items-center justify-content-between"
                      @click="handleChangeRole('partner/dashboard')">
                      <span class="fs-sm fw-medium">Партнёр</span>
                    </button>
                    <a class="dropdown-item d-flex align-items-center justify-content-between"
                      href="javascript:void(0)">
                      <span class="fs-sm fw-medium">Гость</span>
                    </a>
                  </div>
                </div>
              </div>
              <!--END Role Dropdown-->

            </slot>
          </div>
          <!-- END Right Section -->
        </slot>
      </div>
      <!-- END Header Content -->


      <!-- Header Loader -->
      <div id="page-header-loader" class="overlay-header bg-body-extra-light"
        :class="{ show: store.settings.headerLoader }">
        <div class="content-header">
          <div class="w-100 text-center">
            <i class="fa fa-fw fa-circle-notch fa-spin"></i>
          </div>
        </div>
      </div>
      <!-- END Header Loader -->
    </slot>
  </header>
  <!-- END Header -->
</template>
