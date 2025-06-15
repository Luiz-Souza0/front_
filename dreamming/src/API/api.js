// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://forty-spoons-raise.loca.lt/api', // Define a URL base para as requisições
});

export default api;

