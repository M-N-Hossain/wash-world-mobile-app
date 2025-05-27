import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { logout } from '../redux/userSlice';
import { store } from '../store/store';

// Create axios instance
const axiosInstance = axios.create();

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle 401 (Unauthorized) errors, which indicate token expiration
    if (error.response && error.response.status === 401) {
      console.log('Token expired or invalid, logging out');
      // Clear the token from SecureStore
      await SecureStore.deleteItemAsync('jwt');
      // Dispatch logout action to Redux
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 