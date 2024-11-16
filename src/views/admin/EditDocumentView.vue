<template>
  <div class="m-5 mb-5">
    <BaseBlock title="Редактировать данные документов">
      <template #content>
        <form @submit.prevent="handleSubmit" class="row g-3 m-2 mb-5">
          <!-- Existing Fields -->
          <div class="col-md-6 mb-3">
            <label for="documentid" class="form-label">ID</label>
            <input
              type="text"
              class="form-control"
              id="documentid"
              v-model="document.id"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="user_id" class="form-label">ID Пользователя</label>
            <input
              type="text"
              class="form-control"
              id="user_id"
              v-model="document.user_id"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="filename" class="form-label">Название</label>
            <input
              type="text"
              class="form-control"
              id="filename"
              v-model="document.filename"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="status" class="form-label">Доступ</label>
            <select class="form-control" id="status" v-model="document.status" required>
              <option value="0">Неизвестно</option>
              <option value="1">Включено</option>
              <option value="2">Включено</option>
            </select>
          </div>
          
          <!-- New Fields -->
          <div class="col-md-6 mb-3">
            <label for="serverfilename" class="form-label">Имя файла на сервере</label>
            <input
              type="text"
              class="form-control"
              id="serverfilename"
              v-model="document.serverfilename"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="adddate" class="form-label">Дата добавления</label>
            <input
              type="text"
              class="form-control"
              id="adddate"
              v-model="document.adddate"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="userrole" class="form-label">Роль пользователя</label>
            <input
              type="text"
              class="form-control"
              id="userrole"
              v-model="document.userrole"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="url" class="form-label">Ссылка</label>
            <input
              type="text"
              class="form-control"
              id="url"
              v-model="document.url"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="enabled" class="form-label">Разрешение</label>
            <input
              type="text"
              class="form-control"
              id="enabled"
              v-model="document.enabled"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="created_at" class="form-label">Дата создания</label>
            <input
              type="datetime-local"
              class="form-control"
              id="created_at"
              v-model="document.created_at"
              required
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="updated_at" class="form-label">Дата обновления</label>
            <input
              type="datetime-local"
              class="form-control"
              id="updated_at"
              v-model="document.updated_at"
              required
            />
          </div>
                    
        </form>
        
        <div class="row g-3 m-2 mb-5" v-if="document && document.id">
          <RemoveData :path="$route.path" @delete="handleDelete"/>
          <EditData :path="$route.path" :data="document" @submit="handleSubmit"/>
        </div>
      </template>
    </BaseBlock>
  </div>
</template>
<script>
import RemoveData from "@/components/RemoveData.vue";
import EditData from "@/components/EditData.vue";
import axiosInstance from "@/services/axios.js";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "EditDocumentView",
  props: {
    status: {
      type: Number,
      required: true
    }
  },
  components: {
    RemoveData,
    EditData,
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();

    // Define finance as a reactive object with its expected properties
    const document = ref({
      id: "",
      user_id: "",
      filename: "",
      serverfilename: "",
      status: props.status,
      adddate: "",
      userrole: "",
      url: "",
      enabled:"",
      created_at: "",
      updated_at: ""
    });

    const fetchDocumentDetails = async (id) => {
      try {
        const response = await axiosInstance.get(`/docs/${id}`);
        document.value = response.data;
      } catch (error) {
        console.error("Error fetching document details:", error);
      }
    };

    onMounted(() => {
      fetchDocumentDetails(route.params.id);
    });

    const handleSubmit = async () => {
      try {
        await axiosInstance.put(`/doсs/${route.params.id}`, document.value);
        router.push("/docs");
      } catch (error) {
        console.error("Error updating document:", error);
      }
    };

    return {
      document,
      handleSubmit,
    };
  },
};
</script>
