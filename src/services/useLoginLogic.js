import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useTemplateStore } from "@/stores/template";
import { useUserStore } from "@/stores/user";
import { useClientStore } from "@/stores/client";
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function useLoginLogic() {
  const store = useTemplateStore();
  const userStore = useUserStore();
  const clientStore = useClientStore();
  const router = useRouter();

  const state = reactive({
    email: null,
    password: null,
    errorMessage: "",
  });

  const rules = computed(() => ({
    email: { required, minLength: minLength(3) },
    password: { required, minLength: minLength(5) },
  }));

  const v$ = useVuelidate(rules, state);

  const onSubmit = async () => {
    const result = await v$.value.$validate();

    if (!result) {
      return; // Notify user form is invalid
    }

    try {
      state.errorMessage = ""; // Reset error message on a new login attempt

      const response = await axios.post(`${apiBaseUrl}/login`, {
        email: state.email,
        password: state.password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      store.setAuthHandler(true);
      localStorage.setItem("isAuth", true);

      const userResponse = await axios.get(`${apiBaseUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = userResponse.data;
      userStore.setUserData(user);

      switch (userStore.userRole) {
        case "admin":
          router.push("/Adashboard");
          break;
        case "moderator":
          router.push("/Mdashboard");
          break;
        case "client":
          await clientStore.fetchClientProfile();
          if (clientStore.isActiveClient && userStore.balance > 0) router.push("/myvideo");
          else if (clientStore.isActiveClient) router.push("/myfinance");
          else router.push("/profile");
          break;
        case "partner":
          if (user.status === 2) router.push("/Pdashboard");
          else if (user.status === 1) router.push("/mycars");
          else router.push("/about");
          break;
        case "quest":
          router.push("/guest");
          break;
        case "support":
          router.push("/Sdashboard");
          break;
        default:
          console.error("Unknown user role:", userStore.userRole);
          router.push("/default");
          break;
      }
    } catch (error) {
      console.error("Error logging in:", error);

      if (error.response && error.response.status === 401) {
        state.errorMessage = "Неверный email или пароль.";
      } else {
        state.errorMessage = "Произошла ошибка. Попробуйте еще раз.";
      }
    }
  };

  return {
    state,
    v$,
    onSubmit,
  };
}
