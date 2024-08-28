import axios from 'axios';

const API = axios.create({
  baseURL: 'https://feedback-backend-ochre.vercel.app/api',
});

// Attach the token to every request if present in localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
