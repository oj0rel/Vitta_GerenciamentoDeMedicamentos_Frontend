import axios from 'axios';

// 192.168.100.10 ip da máquina
// 10.136.36.30
export const apiManager = axios.create({
  baseURL: 'http://192.168.100.10:8080',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiManager;