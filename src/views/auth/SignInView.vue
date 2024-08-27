<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useTemplateStore } from "@/stores/template";
import axios from "axios"; // Import axios
import VueSelect from "vue-select";

// Vuelidate, for more info and examples you can check out https://github.com/vuelidate/vuelidate
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import "vue-select/dist/vue-select.css";

// Main store and Router
const store = useTemplateStore();
const router = useRouter();

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
    const response = await axios.post('https://olhar.vit.ooo/api/login', {
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

    // Redirect user based on role selection
    switch (vueSelectState.optionsSelected) {
      case "Администратор":
        router.push("/admin/dashboard");
        break;
      case "Модератор":
        router.push("/moderator/dashboard");
        break;
      case "Клиент":
        router.push("/client/dashboard");
        break;
      case "Партнёр":
        router.push("/partner/dashboard");
        break;
      case "Гость":
        router.push("/guest");
        break;
    }
  } catch (error) {
    // Handle errors (e.g., notify the user about invalid credentials)
    console.error("Login failed:", error);
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
          <BaseBlock title="Sign In" class="mb-0">
            <div class="p-sm-3 px-lg-4 px-xxl-5 py-lg-5">
              <h1 class="h2 mb-1">Olhar Taxi</h1>
              <p class="fw-medium text-muted">Welcome, please login.</p>

              <div>
                <div class="mb-4">
                  <VueSelect
                    v-model="vueSelectState.optionsSelected"
                    :options="vueSelectState.optionsMultiple"
                    placeholder="Выберите роль..."
                  ></VueSelect>
                </div>
              </div>

              <!-- Sign In Form -->
              <form @submit.prevent="onSubmit">
                <div class="py-3">
                  <div class="mb-4">
                    <input
                      type="text"
                      class="form-control form-control-alt form-control-lg"
                      id="login-email"
                      name="login-email"
                      placeholder="email"
                      :class="{
                        'is-invalid': v$.email.$errors.length,
                      }"
                      v-model="state.email"
                      @blur="v$.email.$touch"
                    />
                    <div
                      v-if="v$.email.$errors.length"
                      class="invalid-feedback animated fadeIn"
                    >
                      Please enter your email
                    </div>
                  </div>
                  <div class="mb-4">
                    <input
                      type="password"
                      class="form-control form-control-alt form-control-lg"
                      id="login-password"
                      name="login-password"
                      placeholder="Password"
                      :class="{
                        'is-invalid': v$.password.$errors.length,
                      }"
                      v-model="state.password"
                      @blur="v$.password.$touch"
                    />
                    <div
                      v-if="v$.password.$errors.length"
                      class="invalid-feedback animated fadeIn"
                    >
                      Please enter your password
                    </div>
                  </div>
                </div>
                <div class="row mb-4">
                  <div class="col-md-6 col-xl-5">
                    <button type="submit" class="btn w-100 btn-alt-primary">
                      <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i>
                      Sign In
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
