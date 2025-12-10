import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/json';

const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn('Unauthorized access. Redirecting to login...');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  },
);

export default http;
