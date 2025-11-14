import axios from 'axios';

export const apiManager = axios.create({
  baseURL: 'http://academico3.rj.senac.br/vitta',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiManager;