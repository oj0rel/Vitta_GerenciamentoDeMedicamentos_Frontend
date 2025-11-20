import axios from 'axios';

// http://academico3.rj.senac.br/vitta
const BASE_URL = 'http://192.168.100.10:8407'

export const apiManager = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiManager;