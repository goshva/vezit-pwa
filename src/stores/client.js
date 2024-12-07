import { defineStore } from 'pinia';
import axiosInstance from '@/services/axios.js';

export const useClientStore = defineStore('client', {
  state: () => ({
    userId: null,
    id: null,
    name: '',
    bussines: '', // Corrected field name
    description: '',
    OGRN: '',
    BIK: '',
    contactName: '',
    contactTel: '',
    contactEMail: '', // Corrected field name
    status: null,
    createdAt: '',
    updatedAt: '',
    errors: {} // Store validation errors
  }),

  actions: {
    // Action to set client data
    setClientData(clientData) {
      console.log(clientData);
      this.userId = clientData.user_id;
      this.id = clientData.id;
      this.name = clientData.name;
      this.bussines = clientData.bussines; // Corrected field mapping
      this.description = clientData.description;
      this.OGRN = clientData.OGRN;
      this.BIK = clientData.BIK;
      this.contactName = clientData.contactName;
      this.contactTel = clientData.contactTel;
      this.contactEMail = clientData.contactEMail; // Corrected field mapping
      this.status = clientData.status;
      this.createdAt = clientData.created_at;
      this.updatedAt = clientData.updated_at;
    },

    // Action to clear client data
    clearClientData() {
      this.userId = null;
      this.id = null;
      this.name = '';
      this.bussines = '';
      this.description = '';
      this.OGRN = '';
      this.BIK = '';
      this.contactName = '';
      this.contactTel = '';
      this.contactEMail = '';
      this.status = null;
      this.createdAt = '';
      this.updatedAt = '';
      this.errors = {}; // Clear errors
    },

    // Action to fetch client profile
    async fetchClientProfile() {
      try {
        const response = await axiosInstance.get(`/profile`);
        if (response.data) {
          this.setClientData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching client profile:', error);
      }
    },

    // Action to save client profile with error handling
    async saveClient() {
      try {
        await axiosInstance.post(`/profile`, this.$state);
        this.errors = {}; // Clear errors on successful save
      } catch (error) {
        if (error.response?.data?.errors) {
          this.errors = error.response.data.errors; // Store validation errors
        } else {
          console.error('Error saving client:', error);
        }
      }
    }
  },

  getters: {
    // Check if the client is active
    isActiveClient: (state) => state.status === 1,

    // Format creation date
    formattedCreatedAt: (state) => {
      return state.createdAt ? new Date(state.createdAt).toLocaleString() : '';
    },

    // Format updated date
    formattedUpdatedAt: (state) => {
      return state.updatedAt ? new Date(state.updatedAt).toLocaleString() : '';
    },

    // Retrieve specific error messages for a field
    fieldErrors: (state) => (field) => {
      return state.errors[field] ? state.errors[field].join(', ') : null;
    }
  }
});
