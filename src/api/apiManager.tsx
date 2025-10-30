import axios from 'axios';

// 192.168.100.10 ip da máquina

export const apiManager = axios.create({
  baseURL: 'http://localhost:8080',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiManager;