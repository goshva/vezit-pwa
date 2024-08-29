// src/stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    email: '',
    emailVerifiedAt: null,
    userRole: '',
    lastIpAddr: null,
    fullUserName: null,
    companyName: null,
    companyRole: null,
    createdAt: '',
    updatedAt: ''
  }),

  actions: {
    // Action to set user data
    setUserData(userData) {
      this.username = userData.username;
      this.email = userData.email;
      this.emailVerifiedAt = userData.email_verified_at;
      this.userRole = userData.userrole;
      this.lastIpAddr = userData.lastipaddr;
      this.fullUserName = userData.fullusername;
      this.companyName = userData.companyname;
      this.companyRole = userData.companyrole;
      this.createdAt = userData.created_at;
      this.updatedAt = userData.updated_at;
    },

    // Action to clear user data
    clearUserData() {
      this.username = '';
      this.email = '';
      this.emailVerifiedAt = null;
      this.userRole = '';
      this.lastIpAddr = null;
      this.fullUserName = null;
      this.companyName = null;
      this.companyRole = null;
      this.createdAt = '';
      this.updatedAt = '';
    }
  },

  getters: {
    // Example getter to check if the user is an admin (assuming user role "0" is admin)
    isAdmin: (state) => state.userRole === '0',
    roleName: (state) => {
        switch (state.userRole) {
          case '0':
            return 'Администратор';
          case '1':
            return 'Модератор';
          case '2':
            return 'Клиент';
          case '3':
            return 'Партнёр';
          case '4':
            return 'Гость';
          default:
            return 'Unknown'; // Fallback if userRole is not one of the expected values
        }
      },
  }
});
