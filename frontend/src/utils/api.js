import axios from 'axios';

export const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://127.0.0.1:8000'
  : window.location.origin;

const api = axios.create({
  baseURL: `${BASE_URL}/api/`,
  headers: { 
    'Content-Type': 'application/json' 
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized: redirect to login');
    }
    return Promise.reject(error);
  }
);

export default api;