// src/api.js
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080'; // ajuste se necessário
axios.defaults.withCredentials = true; // ESSENCIAL para enviar cookie de sessão

export default axios;
