import axios from "axios";
const API = `${import.meta.env.VITE_SERVER_BASE_URL}/albums`;

export const getAlbums = () => axios.get(API, { withCredentials: true });

export const getAlbumById = (id) =>
  axios.get(`${API}/${id}`, { withCredentials: true });

export const createAlbum = (formData) =>
  axios.post(API, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateAlbum = (id, data) =>
  axios.put(`${API}/${id}`, data, { withCredentials: true });

export const deleteAlbum = (id) =>
  axios.delete(`${API}/${id}`, { withCredentials: true });

export const shareAlbum = (id, emails) =>
  axios.post(`${API}/${id}/share`, { emails }, { withCredentials: true });

export const getSharedAlbums = () =>
  axios.get(`${API}/shared`, { withCredentials: true });
