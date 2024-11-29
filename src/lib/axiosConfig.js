import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apitopostgres-production.up.railway.app',
});

export default api;
