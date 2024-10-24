<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useTemplateStore } from "@/stores/template";
import axios from "axios"; // Import axios
import useVuelidate from "@vuelidate/core";
import { required, minLength, email, sameAs } from "@vuelidate/validators";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Main store and Router
const store = useTemplateStore();
const router = useRouter();

// Input state variables
const state = reactive({
  username: null,
  email: null,
  password: null,
  confirmPassword: null,
  userRole: null,
  terms: null,
  errorEmail: null
});

// Validation rules
const rules = computed(() => {
  return {
    username: {
      required,
      minLength: minLength(3),
    },
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
      required
    }
  };
});

// Use vuelidate
const v$ = useVuelidate(rules, state);

// On form submission
async function onSubmit() {
  const result = await v$.value.$validate();
  if (!result) {
    // notify user form is invalid
    return;
  }

  try {
    // Make the API request to register the user
    const response = await axios.post(`${apiBaseUrl}/register`, {
      username: state.username,
      email: state.email,
      password: state.password,
      password_confirmation: state.confirmPassword,
      userrole: state.userRole,
    });

    // Assuming the response contains a JWT token
    const token = response.data.token;

    // Store the token (in localStorage for this example)
    localStorage.setItem('token', token);

    // Optionally, store token in Vuex or Pinia store for easier access
    // store.commit('setToken', token); // If using Vuex
    // store.setToken(token); // If using Pinia

    // Redirect user to the dashboard after successful registration
    router.push("/auth/signin");
  } catch (error) {
    // Handle errors (e.g., notify user about the error)
    if (error.response.data.email){
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
              <RouterLink :to="{ name: 'auth-signin' }" class="btn-block-option">
                <i class="fa fa-sign-in-alt"></i>
              </RouterLink>
            </template>

            <div class="p-sm-3 px-lg-4 px-xxl-5 py-lg-5">
              <h1 class="h2 mb-1">Olhar.Media</h1>
              <p class="fw-medium text-muted">
                Заполните форму для регистрации
              </p>

              <!-- Sign Up Form -->
              <form @submit.prevent="onSubmit">
                <div class="py-3">
                  <div class="mb-4">
                    <input type="text" class="form-control form-control-lg form-control-alt" id="signup-username"
                      name="signup-username" placeholder="Имя" autocomplete="off" :class="{
                        'is-invalid': v$.username.$errors.length,
                      }" v-model="state.username" @blur="v$.username.$touch" />
                    <div v-if="v$.username.$errors.length" class="invalid-feedback animated fadeIn">
                      Please enter a username
                    </div>
                  </div>
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
                  <div class="mb-4">
                    <label class="form-label" for="subject">Выберите роль</label>

                    <select  class="form-select form-control form-control-lg form-control-alt"  id="signup-userrole"
                      v-model="state.userRole" :class="{ 'is-invalid': v$.userRole.$errors.length }"
                      @blur="v$.userRole.$touch">
                      <option value="admin">Администратор</option>
                      <option value="moderator">Модератор</option>
                      <option value="client">Клиент</option>
                      <option value="partner">Партнёр</option>
                      <option value="quest">Гость</option>
                      <option value="support">Тех. поддержка</option>
                    </select>

                    <div v-if="v$.userRole.$errors.length" class="invalid-feedback animated fadeIn">
                      Выберите роль
                    </div>
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
                    <button type="submit" class="btn w-100 btn-success">
                      Регистрация
                    </button>
                  </div>
                  <div class="col-md-6 col-xl-6">
                    <button @click="() => router.push('/auth/signin')" class="btn w-100 btn-primary">
                      Войти
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

    <!-- Terms Modal -->
    <div class="modal fade" id="one-signup-terms" tabindex="-1" role="dialog" aria-labelledby="one-signup-terms"
      aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-popout" role="document">
        <div class="modal-content">
          <BaseBlock title="Terms &amp; Conditions" transparent class="mb-0">
            <template #options>
              <button type="button" class="btn-block-option" data-bs-dismiss="modal" aria-label="Close">
                <i class="fa fa-fw fa-times"></i>
              </button>
            </template>

            <template #content>
              <div class="block-content">
                <p>
                  Dolor posuere proin blandit accumsan senectus netus nullam
                  curae, ornare laoreet adipiscing luctus mauris adipiscing
                  pretium eget fermentum, tristique lobortis est ut metus
                  lobortis tortor tincidunt himenaeos habitant quis dictumst
                  proin odio sagittis purus mi, nec taciti vestibulum quis in
                  sit varius lorem sit metus mi.
                </p>
                <p>
                  Dolor posuere proin blandit accumsan senectus netus nullam
                  curae, ornare laoreet adipiscing luctus mauris adipiscing
                  pretium eget fermentum, tristique lobortis est ut metus
                  lobortis tortor tincidunt himenaeos habitant quis dictumst
                  proin odio sagittis purus mi, nec taciti vestibulum quis in
                  sit varius lorem sit metus mi.
                </p>
                <p>
                  Dolor posuere proin blandit accumsan senectus netus nullam
                  curae, ornare laoreet adipiscing luctus mauris adipiscing
                  pretium eget fermentum, tristique lobortis est ut metus
                  lobortis tortor tincidunt himenaeos habitant quis dictumst
                  proin odio sagittis purus mi, nec taciti vestibulum quis in
                  sit varius lorem sit metus mi.
                </p>
                <p>
                  Dolor posuere proin blandit accumsan senectus netus nullam
                  curae, ornare laoreet adipiscing luctus mauris adipiscing
                  pretium eget fermentum, tristique lobortis est ut metus
                  lobortis tortor tincidunt himenaeos habitant quis dictumst
                  proin odio sagittis purus mi, nec taciti vestibulum quis in
                  sit varius lorem sit metus mi.
                </p>
                <p>
                  Dolor posuere proin blandit accumsan senectus netus nullam
                  curae, ornare laoreet adipiscing luctus mauris adipiscing
                  pretium eget fermentum, tristique lobortis est ut metus
                  lobortis tortor tincidunt himenaeos habitant quis dictumst
                  proin odio sagittis purus mi, nec taciti vestibulum quis in
                  sit varius lorem sit metus mi.
                </p>
                <p>
                  Dolor posuere proin blandit accumsan senectus netus nullam
                  curae, ornare laoreet adipiscing luctus mauris adipiscing
                  pretium eget fermentum, tristique lobortis est ut metus
                  lobortis tortor tincidunt himenaeos habitant quis dictumst
                  proin odio sagittis purus mi, nec taciti vestibulum quis in
                  sit varius lorem sit metus mi.
                </p>
              </div>
              <div class="block-content block-content-full text-end bg-body">
                <button type="button" class="btn btn-sm btn-alt-secondary me-1" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="button" class="btn btn-sm btn-primary" data-bs-dismiss="modal">
                  I Agree
                </button>
              </div>
            </template>
          </BaseBlock>
        </div>
      </div>
    </div>
    <!-- END Terms Modal -->
  </div>
  <!-- END Page Content -->
</template>
