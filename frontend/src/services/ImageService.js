import axios from "axios";

export const uploadImage = (albumId, formData) =>
  axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/albums/${albumId}/images`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getImages = (albumId) =>
  axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/albums/${albumId}/images`, { withCredentials: true });

export const getAllImages = () =>
  axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/albums/images/all`, { withCredentials: true });

export const getAllFavorites = () =>
  axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/albums/images/favorites`, { withCredentials: true });

export const toggleFavorite = (albumId, imageId, isFavorite) =>
  axios.put(`${import.meta.env.VITE_SERVER_BASE_URL}/albums/${albumId}/images/${imageId}/favorite`, { isFavorite }, { withCredentials: true });

export const addComment = (albumId, imageId, comment) =>
  axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/albums/${albumId}/images/${imageId}/comments`, { comment }, { withCredentials: true });

export const deleteImage = (albumId, imageId) =>
  axios.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/albums/${albumId}/images/${imageId}`, { withCredentials: true });
