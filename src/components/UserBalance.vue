<template>
  <p @click="getBalance" class="m-0"><strong>{{ userStore.balance }}</strong> ₽</p>
</template>

<script setup>
import { useUserStore } from '@/stores/user';

// Get the user store
const userStore = useUserStore();

// Fetch the user's balance when the component is mounted
const getBalance = async () => {
  await userStore.fetchUserBalance();
};

// Automatically fetch the balance on component mount
getBalance();
</script>

<style scoped>
/* Add your component-specific styles here */
h1 {
  font-size: 24px;
  color: #333;
}

p {
  font-size: 18px;
  margin: 10px 0;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>