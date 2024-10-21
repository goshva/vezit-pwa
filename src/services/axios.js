import axios from 'axios';

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL  || 'http://localhost:5173/api', // Use your API base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // If the token exists, add it to the headers of the request
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can handle the response here if needed
    return response;
  },
  (error) => {
    // Handle errors globally, like token expiration
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized errors (e.g., redirect to login)
      console.error('Unauthorized! Redirecting to login...');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuth');
      window.location.href = 'http://localhost:5173/#/auth/signin';
      // You can add logic to redirect to login page or handle token refresh here
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
