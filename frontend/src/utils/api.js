import axios from 'axios';

export const BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: { 'Content-Type': 'application/json' },
});

export default api;