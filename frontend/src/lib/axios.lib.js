import axios from 'axios';

export const authServerAxios = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_AUTH_URL}`,
  withCredentials: true,
});

