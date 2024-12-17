import { defineStore } from 'pinia';
import axiosInstance from '@/services/axios.js';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    username: localStorage.getItem('username') || '',
    email: '',
    emailVerifiedAt: null,
    balance: null,
    userRole: localStorage.getItem('userrole') || '',
    lastIpAddr: null,
    fullUserName: null,
    companyName: null,
    companyRole: null,
    userStatus: null,
    createdAt: '',
    updatedAt: ''
  }),

  actions: {
    // Action to set user data
    setUserData(userData) {
      this.id = userData.id;
      this.username = userData.username;
      this.email = userData.email;
      this.emailVerifiedAt = userData.email_verified_at;
      this.balance = userData.balance;
      this.userRole = userData.userrole;
      this.lastIpAddr = userData.lastipaddr;
      this.fullUserName = userData.fullusername;
      this.companyName = userData.companyname;
      this.companyRole = userData.companyrole;
      this.createdAt = userData.created_at;
      this.userStatus = userData.status;
      this.updatedAt = userData.updated_at;
    },

    // Action to clear user data
    clearUserData() {
      this.id = '';
      this.username = '';
      this.email = '';
      this.emailVerifiedAt = null;
      this.userRole = '';
      this.balance = null;
      this.lastIpAddr = null;
      this.fullUserName = null;
      this.companyName = null;
      this.companyRole = null;
      this.createdAt = '';
      this.updatedAt = '';
      this.userStatus = null;
      localStorage.clear()
    },

    // New action to fetch user balance
    async fetchUserBalance() {
      try {
        const response = await axiosInstance.get(`/balance`)
        if (response.data && response.data.balance !== undefined) {
          this.balance = response.data.balance;
        }
      } catch (error) {
        console.error('Error fetching user balance:', error);
      }
    }
  },

  getters: {
    // Example getter to check if the user is an admin (assuming user role "admin" is admin)
    isAdmin: (state) => state.userRole === 'admin',

    roleName: (state) => {
        switch (state.userRole) {
          case 'admin':
            return 'Администратор';
          case 'moderator':
            return 'Модератор';
          case 'client':
            return 'Клиент';
          case 'partner':
            return 'Партнёр';
          case 'guest':
            return 'Гость';
          case 'support':
             return 'Тех. поддержка';  
          case 'agent':
            return 'Агент';
          default:
            return 'Unknown'; // Fallback if userRole is not one of the expected values
        }
    },
  }
});
