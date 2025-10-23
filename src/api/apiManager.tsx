import axios from 'axios';

export const apiManager = axios.create({
  baseURL: 'http://localhost:8080',
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiManager;