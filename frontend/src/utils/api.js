import axios from 'axios';

export const BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: { 'Content-Type': 'application/json' },
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
