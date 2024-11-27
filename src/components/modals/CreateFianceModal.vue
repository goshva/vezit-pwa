<template>
  <button
    type="button"
    class="btn btn-primary push"
    data-bs-toggle="modal"
    data-bs-target="#modal-block-create"
  >
    <i class="fa-solid fa-plus"></i>
  </button>

  <div
    class="modal"
    id="modal-block-create"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-block-create"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <BaseBlock title="Добавить новый платёж" transparent class="mb-0">
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
            <form @submit.prevent="handleSubmit">
              <div class="block-content">
                <div class="input-group mb-3">
                  <!-- Dropdown for user selection -->
                  <select class="form-control" v-model="selectedUserId" @change="handleUserChange">
                    <option disabled value="">Select User</option>
                    <option
                      v-for="user in userSuggestions"
                      :key="user.id"
                      :value="user.id"
                    >
                      {{ user.username }}
                    </option>
                  </select>
                  <!-- Display selected user's role -->
                  <span class="input-group-text" id="basic-addon2">{{ selectedUser?.userrole }}</span>
                </div>
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="text"
                  id="title"
                  v-model="title"
                  placeholder="Title"
                  required
                />
              </div>
              <div class="block-content">
                <textarea
                  class="form-control"
                  id="description"
                  v-model="description"
                  placeholder="Description"
                  required
                ></textarea>
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="number"
                  id="amount"
                  v-model="amount"
                  placeholder="Amount"
                  required
                />
              </div>
              <div class="block-content">
                <input
                  class="form-control"
                  type="datetime-local"
                  id="time"
                  v-model="time"
                  required
                />
              </div>
              <div class="block-content">
                <select class="form-control" id="status" v-model="status" required>
                  <option :value="1">Active</option>
                  <option :value="0">Inactive</option>
                </select>
              </div>
              <div class="block-content block-content-full text-end">
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                  Добавить
                </button>
              </div>
            </form>
          </template>
        </BaseBlock>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axiosInstance from "@/services/axios.js";

// Reactive data
const userSuggestions = ref([]); // List of user search results
const selectedUserId = ref(""); // Selected user's ID
const selectedUser = ref(null); // Selected user object
const title = ref("");
const description = ref("");
const amount = ref(0);
const time = ref(new Date().toISOString().slice(0, 16));
const status = ref(1);

// Fetch users from API (paginated)
const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get('/control');
    userSuggestions.value = response.data.data; // Get users from the response
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// Handle user selection change
const handleUserChange = () => {
  selectedUser.value = userSuggestions.value.find(user => user.id === selectedUserId.value);
};

// Call fetchUsers when the component is mounted to populate the dropdown
fetchUsers();

// Form submission handler to create a new payment
const handleSubmit = async () => {
  if (selectedUser.value) {
    try {
      const response = await axiosInstance.post("/payments", {
        username: selectedUser.value.username, // Use the selected username
        userrole: selectedUser.value.userrole, // Send the user role
        title: title.value,
        description: description.value,
        amount: amount.value,
        time: time.value,
        status: status.value,
      });

      if (response.status === 201) {
        console.log("Payment created successfully!");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  } else {
    console.error("No user selected!");
  }
};
</script>

<style lang="css">
/* Add any additional styles if needed */
</style>
