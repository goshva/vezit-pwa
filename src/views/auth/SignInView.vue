<script setup>
import useLoginLogic from "@/services/useLoginLogic";
import { useTemplateStore } from "@/stores/template";

const { state, v$, onSubmit } = useLoginLogic();
const store = useTemplateStore();
</script>

<template>
  <div class="hero-static d-flex align-items-center">
    <div class="content">
      <div class="row justify-content-center push">
        <div class="col-md-8 col-lg-6 col-xl-4">
          <BaseBlock title="Вход" class="mb-0">
            <div class="p-sm-3 px-lg-4 px-xxl-5 py-lg-5">
              <h1 class="h2 mb-1">Olhar Media</h1>
              <p class="fw-medium text-muted">Приветствует Вас!</p>
              <div v-if="state.errorMessage" class="alert alert-danger">
                {{ state.errorMessage }}
              </div>
              <form @submit.prevent="onSubmit">
                <div class="py-3">
                  <div class="mb-4">
                    <input
                      type="text"
                      class="form-control form-control-alt form-control-lg"
                      id="login-email"
                      name="login-email"
                      placeholder="email"
                      autocomplete="email"
                      :class="{ 'is-invalid': v$.email.$errors.length }"
                      v-model="state.email"
                      @blur="v$.email.$touch"
                    />
                    <div v-if="v$.email.$errors.length" class="invalid-feedback animated fadeIn">
                      Введите вашу почту
                    </div>
                  </div>
                  <div class="mb-4">
                    <input
                      type="password"
                      class="form-control form-control-alt form-control-lg"
                      id="login-password"
                      name="login-password"
                      placeholder="Password"
                      :class="{ 'is-invalid': v$.password.$errors.length }"
                      v-model="state.password"
                      @blur="v$.password.$touch"
                    />
                    <div v-if="v$.password.$errors.length" class="invalid-feedback animated fadeIn">
                      Введите ваш пароль
                    </div>
                  </div>
                </div>
                <div class="row mb-4">
                  <div class="col-md-6 col-xl-6">
                    <button type="submit" class="btn w-100 btn-alt-primary">
                      <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i>
                      Войти
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </BaseBlock>
        </div>
      </div>
      <div class="fs-sm text-muted text-center">
        <strong>{{ store?.app?.name || "App Name" }} {{ store?.app?.version || "1.0" }}</strong>
        &copy; {{ store?.app?.copyright || "2024" }}
      </div>
    </div>
  </div>
</template>
