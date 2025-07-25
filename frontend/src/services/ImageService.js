import axios from "axios";
const API = `${import.meta.env.VITE_SERVER_BASE_URL}/images`;

export const uploadImage = (albumId, formData) =>
  axios.post(`${API}/albums/${albumId}`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });

export const uploadToAllImage = (formData) =>
  axios.post(API, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getImages = (albumId) =>
  axios.get(`${API}/albums/${albumId}`, { withCredentials: true });

export const getAllImages = () =>
  axios.get(API, { withCredentials: true });

export const getAllFavorites = () =>
  axios.get(`${API}/favorites`, { withCredentials: true });

export const toggleFavorite = (albumId, imageId, isFavorite) =>
  axios.put(`${API}/albums/${albumId}/${imageId}/favorite`, { isFavorite }, { withCredentials: true });

export const addComment = (albumId, imageId, comment) =>
  axios.post(`${API}/albums/${albumId}/${imageId}/comments`, { comment }, { withCredentials: true });

export const deleteImage = (albumId, imageId) =>
  axios.delete(`${API}/albums/${albumId}/${imageId}`, { withCredentials: true });
