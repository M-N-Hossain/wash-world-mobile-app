import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

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
      // Clear the token from SecureStore
      SecureStore.deleteItemAsync("jwt");
    }
    return Promise.reject(error);
  }
);

// This function will be called from the main app to set up the logout handler
export const setupLogoutHandler = (logoutFn: () => void) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        // Handle 401 (Unauthorized) errors, which indicate token expiration
        
        // Clear the token from SecureStore
        SecureStore.deleteItemAsync("jwt");
        
        // Instead of directly importing the store and actions (which creates circular dependencies),
        // we'll use a callback that will be set after the store is created
        if (logoutFn) {
          logoutFn(); // Call the provided logout function
        }
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance; 