<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useTemplateStore } from "@/stores/template";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import VueSelect from "vue-select";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import "vue-select/dist/vue-select.css";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const store = useTemplateStore();
const userStore = useUserStore(); // Initialize the user store
const router = useRouter();

let hasUser = true;

// Input state variables
const state = reactive({
  email: null,
  password: null,
});

// Select variables
const roles = ["Администратор", "Модератор", "Клиент", "Партнёр", "Гость"];

const vueSelectState = reactive({
  options: roles,
  optionsSelected: null,
  optionsMultiple: roles,
  optionsMultipleSelected: null,
});

// Validation rules
const rules = computed(() => {
  return {
    email: {
      required,
      minLength: minLength(3),
    },
    password: {
      required,
      minLength: minLength(5),
    },
  };
});

// Use vuelidate
const v$ = useVuelidate(rules, state);

// On form submission
async function onSubmit() {
  const result = await v$.value.$validate();

  if (!result) {
    // Notify user form is invalid
    return;
  }

  try {
    // Make the API request to login the user
    const response = await axios.post(`${apiBaseUrl}/login`, {
      email: state.email,
      password: state.password,
    });

    // Assuming the response contains a JWT token
    const token = response.data.token;

    // Store the token (in localStorage for this example)
    localStorage.setItem('token', token);

    // Optionally, set token in Vuex or Pinia store
    store.setAuthHandler(true);
    localStorage.setItem("isAuth", true);

    // Fetch user details with the token
    const userResponse = await axios.get(`${apiBaseUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send the token in Authorization header
      },
    });

    // Assuming the response contains user data
    const user = userResponse.data;

    // Set user data in the Pinia store
    userStore.setUserData(user);

    // Redirect user based on user role from the store
    switch (userStore.userRole) {
      case "admin":
        router.push("/Adashboard");
        break;
      case "moderator":
        router.push("/Mdashboard");
        break;
      case "client":
        await userStore.fetchUserBalance()
        if (user.status == 1 && userStore.balance >= 0) router.push("/myvideo")
        else if (user.status == 1) router.push("/myfinance")
        else router.push("/profile")
        break;
      case "partner":
        router.push("/Pdashboard");
        break;
      case "quest": 
        router.push("/guest");
        break;
        case "support": 
        router.push("/Sdashboard");
        break;        
      default:
        console.error("Unknown user role:", userStore.userRole);
        router.push("/default"); // Redirect to a default route
        break;
    }
  } catch (error) {
    router.push("/auth/signup");
  }
}
</script>
<template>
  <!-- Page Content -->
  <div class="hero-static d-flex align-items-center">
    <div class="content">
      <div class="row justify-content-center push">
        <div class="col-md-8 col-lg-6 col-xl-4">
          <!-- Sign In Block -->
          <BaseBlock title="Вход" class="mb-0">
            <div class="p-sm-3 px-lg-4 px-xxl-5 py-lg-5">
              <h1 class="h2 mb-1">Olhar Media</h1>
              <p class="fw-medium text-muted">Приветствует Вас!</p>
              <!-- Sign In Form -->
              <form @submit.prevent="onSubmit">
                <div class="py-3">
                  <div class="mb-4">
                    <input type="text" class="form-control form-control-alt form-control-lg" id="login-email"
                      name="login-email" placeholder="email" autocomplete="email" :class="{
                        'is-invalid': v$.email.$errors.length,
                      }" v-model="state.email" @blur="v$.email.$touch" />
                    <div v-if="v$.email.$errors.length" class="invalid-feedback animated fadeIn">
                      Введите вашу почту
                    </div>
                  </div>
                  <div class="mb-4">
                    <input type="password" class="form-control form-control-alt form-control-lg" id="login-password"
                      name="login-password" placeholder="Password" :class="{
                        'is-invalid': v$.password.$errors.length,
                      }" v-model="state.password" @blur="v$.password.$touch" />
                    <div v-if="v$.password.$errors.length" class="invalid-feedback animated fadeIn">
                      введите ваш пароль
                    </div>
                  </div>
                </div>
                <div class="row mb-4">
                  <div class="col-md-6 col-xl-5">
                    <button type="submit" class="btn w-100 btn-alt-primary">
                      <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i>
                      Войти
                    </button>
                  </div>
                </div>
              </form>
              <!-- END Sign In Form -->
            </div>
          </BaseBlock>
          <!-- END Sign In Block -->
        </div>
      </div>
      <div class="fs-sm text-muted text-center">
        <strong>{{ store.app.name + " " + store.app.version }}</strong> &copy;
        {{ store.app.copyright }}
      </div>
    </div>
  </div>
  <!-- END Page Content -->
</template>
