<script setup>
import { reactive, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTemplateStore } from "@/stores/template";
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, minLength, email, sameAs } from "@vuelidate/validators";
import useLoginLogic from "@/services/useLoginLogic";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Main store and Router
const store = useTemplateStore();
const router = useRouter();
const route = useRoute(); // Access current route

// Input state variables
const state = reactive({
  username: null,
  email: null,
  password: null,
  confirmPassword: null,
  userRole: null, // Will be set based on the route
  terms: null,
  errorEmail: null,
});

// Validation rules
const rules = computed(() => ({
  email: {
    required,
    email,
  },
  password: {
    required,
    minLength: minLength(5),
  },
  confirmPassword: {
    required,
    sameAs: sameAs(state.password),
  },
  terms: {
    sameAs: sameAs(true),
  },
  userRole: {
    required,
  },
}));

// Use vuelidate
const v$ = useVuelidate(rules, state);

// Import login logic
const { state: loginState, onSubmit: loginUser } = useLoginLogic();

// Dynamically set the role based on the route
onMounted(() => {
  const path = route.name;
  if (path === "partner-signup") {
    state.userRole = "partner";
  } else if (path === "client-signup") {
    state.userRole = "client";
  } else {
    state.userRole = null; // Handle invalid or missing role
  }
});

// On form submission
async function onSubmit() {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  try {
    await axios.post(`${apiBaseUrl}/register`, {
      username: state.email.split("@")[0],
      email: state.email,
      password: state.password,
      password_confirmation: state.confirmPassword,
      userrole: state.userRole,
    });

    loginState.email = state.email;
    loginState.password = state.password;
    await loginUser();

  } catch (error) {
    if (error.response?.data?.email) {
      state.errorEmail = error.response.data.email[0];
    } else {
      console.error("Registration failed:", error);
    }
  }
}
</script>

<template>
  <!-- Page Content -->
  <div class="hero-static d-flex align-items-center">
    <div class="content">
      <div class="row justify-content-center push">
        <div class="col-md-8 col-lg-6 col-xl-4">
          <!-- Sign Up Block -->
          <BaseBlock title="Создать аккаунт" class="mb-0">
            <template #options>
              <a class="btn-block-option fs-sm" href="javascript:void(0)" data-bs-toggle="modal"
                data-bs-target="#one-signup-terms">правила использования</a>
            </template>

            <div class="p-sm-3 px-lg-4 px-xxl-5 py-lg-5">
              <h1 class="h2 mb-1">Olhar.Media</h1>
              <p class="fw-medium text-muted">
                Заполните форму для регистрации как {{ state.userRole === "partner" ? "Партнёр" : "Клиент" }}
              </p>

              <!-- Sign Up Form -->
              <form @submit.prevent="onSubmit">
                <div class="py-3">
                  <div class="mb-4">
                    <input type="email" class="form-control form-control-lg form-control-alt" id="signup-email"
                      name="signup-email" placeholder="Email" autocomplete="email" :class="{
                        'is-invalid': v$.email.$errors.length,
                      }" v-model="state.email" @blur="v$.email.$touch" />
                    <div v-if="v$.email.$errors.length" class="invalid-feedback animated fadeIn">
                      Введите ваш адрес электронной почты
                    </div>
                    <div v-if="state.errorEmail" class="animated fadeIn" style="margin-top: 0.375rem; font-size: 0.875rem; color: #e75a79;">
                      {{state.errorEmail}}
                    </div>
                  </div>
                  <div class="mb-4">
                    <input type="password" class="form-control form-control-lg form-control-alt" id="signup-password"
                      name="signup-password" placeholder="Password" :class="{
                        'is-invalid': v$.password.$errors.length,
                      }" v-model="state.password" @blur="v$.password.$touch" />
                    <div v-if="v$.password.$errors.length" class="invalid-feedback animated fadeIn">
                      Придумайте пароль для входа
                    </div>
                  </div>
                  <div class="mb-4">
                    <input type="password" class="form-control form-control-lg form-control-alt"
                      id="signup-password-confirm" name="signup-password-confirm" placeholder="Пароль еще раз" :class="{
                        'is-invalid': v$.confirmPassword.$errors.length,
                      }" v-model="state.confirmPassword" @blur="v$.confirmPassword.$touch" />
                    <div v-if="v$.confirmPassword.$errors.length" class="invalid-feedback animated fadeIn">
                      Повторите введеный пароль еще раз
                    </div>
                  </div>
                  <div class="mb-4" v-if="!state.userRole">
                    <p class="text-danger">Роль не выбрана или неверна.</p>
                  </div>
                  <div class="mb-4">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="signup-terms" name="signup-terms" :class="{
                        'is-invalid': v$.terms.$errors.length,
                      }" v-model="state.terms" @blur="v$.terms.$touch" />
                      <label class="form-check-label" for="signup-terms">Согласен с правилами</label>
                      <div v-if="v$.terms.$errors.length" class="invalid-feedback animated fadeIn">
                        Вы должны поставить согласие
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-4">
                  <div class="col-md-6 col-xl-6">
                    <button type="submit" class="btn btn-lg btn-alt-success" :disabled="!state.userRole">
                      <i class="fa fa-fw fa-plus me-1 opacity-50"></i> Регистрация
                    </button>
                  </div>
                  <div v-if="state.errorEmail" class="col-md-6 col-xl-6 text-end">
                    <button @click="() => router.push('/auth/signin')" class="btn btn-lg btn-alt-primary">
                      <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i>Войти
                    </button>
                  </div>
                </div>
              </form>
              <!-- END Sign Up Form -->
            </div>
          </BaseBlock>
          <!-- END Sign Up Block -->
        </div>
      </div>
      <div class="fs-sm text-muted text-center">
        <strong>{{ store.app.name + " " + store.app.version }}</strong> &copy;
        {{ store.app.copyright }}
      </div>
    </div>
  </div>
</template>
