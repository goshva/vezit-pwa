<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/services/axios.js'; // Assuming axiosInstance is configured elsewhere

// Data for holding user information, loading state, and errors
const users = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Function to fetch users from the API
const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token'); // Get the token from local storage
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axiosInstance.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
    });

    users.value = response.data; // Set the users data
  } catch (err) {
    error.value = err.message || 'Failed to fetch users';
  } finally {
    isLoading.value = false;
  }
};

// Fetch users on component mount
onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="m-5 mb-0">
    <BaseBlock title="Контроль пользователей" class="mb-0">
      <template #content>
        <!-- Show loading spinner or error message -->
        <div v-if="isLoading" class="text-center">
          <i class="fa fa-spinner fa-spin"></i> Loading users...
        </div>
        <div v-if="error" class="text-center text-danger">
          {{ error }}
        </div>

        <!-- Show table when data is loaded -->
        <div v-else class="block-content block-content-full">
          <div class="table-responsive">
            <table class="table table-hover table-vcenter">
              <thead>
                <tr>
                  <th>ID</th>
                  <th class="d-none d-xl-table-cell">Наименование</th>
                  <th>Кол-во</th>
                  <th>Город</th>
                  <th>Контакты</th>
                  <th class="d-none d-sm-table-cell">Дата регистрации</th>
                </tr>
              </thead>
              <tbody class="fs-sm">
                <tr v-for="user in users" :key="user.id">
                  <td>
                    <a class="fw-semibold" href="javascript:void(0)">
                      {{ user.id }}
                    </a>
                  </td>
                  <td class="d-none d-xl-table-cell">
                    <a class="fw-semibold" href="javascript:void(0)">
                      {{ user.username }} <!-- Display username -->
                    </a>
                  </td>
                  <td>0</td> <!-- Fixed value for Кол-во -->
                  <td>0</td> <!-- Fixed value for Город -->
                  <td>{{ user.email }}</td> <!-- Display email -->
                  <td class="d-none d-sm-table-cell">
                    <strong>{{ new Date(user.created_at).toLocaleDateString() }}</strong> <!-- Display formatted date -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </BaseBlock>
  </div>
</template>

<style lang="scss">
/* Add custom styles if necessary */
</style>
