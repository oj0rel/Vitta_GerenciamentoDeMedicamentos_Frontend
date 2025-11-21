import axios from 'axios';

const BASE_URL = 'http://academico3.rj.senac.br/vitta'

export const apiManager = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiManager;