// import axios from 'axios';
// import { API_BASE_URL } from './Api';

// // Create axios instance with default config
// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor to add auth token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle errors
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       // Server responded with error status
//       const errorMessage = error.response.data?.error || error.response.data?.message || 'An error occurred';
//       throw new Error(errorMessage);
//     } else if (error.request) {
//       // Request was made but no response received
//       throw new Error('No response from server. Please check your connection.');
//     } else {
//       // Something else happened
//       throw new Error(error.message || 'An unexpected error occurred');
//     }
//   }
// );

// export default axiosInstance;

import axios from 'axios';
import { API_BASE_URL } from './Api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    const adminToken = localStorage.getItem('adminToken');
    

    if (config.url?.includes('/admin/')) {
      if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      }
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized - token expired or invalid
      if (error.response.status === 401) {
        const isAdminRoute = error.config.url?.includes('/admin/');
        
        if (isAdminRoute) {
          localStorage.removeItem('adminToken');
          window.location.href = '/admin';
        } else {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
      }
      
      const errorMessage = error.response.data?.error || error.response.data?.message || 'An error occurred';
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

export default axiosInstance;