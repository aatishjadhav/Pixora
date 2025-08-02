import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAlbumById } from "../services/AlbumService";
import { toggleFavorite } from "../services/ImageService";
import moment from "moment";
import ShareAlbumModal from "./ShareAlbumModal";
import axios from "axios";
import { BASE_URL } from "../config";

export default function AlbumDetail() {
  const navigate = useNavigate();
  const { albumId } = useParams();
  const [images, setImages] = useState([]);
  const [album, setAlbum] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const url = showFavoritesOnly
          ? `${BASE_URL}/images/albums/${albumId}/favorites`
          : `${BASE_URL}/images/albums/${albumId}`;

        const res = await axios.get(url, { withCredentials: true });
        setImages(res.data);
      } catch (error) {
        console.error("Failed to fetch images", error);
      }
    };

    fetchImages();
    getAlbumById(albumId).then((res) => setAlbum(res.data));
  }, [albumId, showFavoritesOnly]);

  const handleFavoriteToggle = async (imageId, currentStatus) => {
    try {
      await toggleFavorite(albumId, imageId, !currentStatus);

      setImages((prev) =>
        prev.map((img) =>
          img._id === imageId ? { ...img, isFavorite: !currentStatus } : img
        )
      );
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {album && (
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800">{album.name}</h2>
            <div className="flex items-center gap-3">
              <button
                className="hover:border-gray-600 p-1 rounded-xl px-3 py-2 cursor-pointer border border-gray-300"
                onClick={() => navigate(`/albums/${album._id}/upload`)}
              >
                <div className="flex items-center gap-2">
                  <svg
                    width="18px"
                    height="18px"
                    className="v1262d"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z"></path>
                  </svg>
                  <span>Add Photo</span>
                </div>
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="p-1 rounded-xl px-3 py-2 cursor-pointer border border-gray-500"
              >
                Share Album
              </button>
              <button
                onClick={() => setShowFavoritesOnly((prev) => !prev)}
                className={`px-3 py-2 border rounded-xl ${
                  showFavoritesOnly
                    ? "bg-blue-500 text-white"
                    : "border-gray-500"
                }`}
              >
                {showFavoritesOnly ? "Show All" : "Favorites"}
              </button>
            </div>
          </div>
          {showShareModal && (
            <div className="fixed inset-0 bg-neutral-100/60 z-50 flex items-center justify-center">
              <ShareAlbumModal
                albumId={album._id}
                onClose={() => setShowShareModal(false)}
              />
            </div>
          )}

          <div className="py-3">
            <hr />
          </div>
          <p className="text-sm text-gray-500">
            Created on {moment(album.createdAt).format("MMMM D, YYYY")}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="relative group">
            <div
              key={img._id}
              className="relative group cursor-pointer"
              onClick={() => navigate(`/images/${img._id}/comments`)}
            >
              <img
                src={img.cloudUrl}
                alt={img.name}
                className="w-full h-60 object-cover rounded shadow-sm"
              />
            </div>
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => handleFavoriteToggle(img._id, img.isFavorite)}
            >
              {img.isFavorite ? (
                <svg
                  className="w-6 h-6 text-red-500 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                       2 5.42 4.42 3 7.5 3 
                       c1.74 0 3.41 0.81 4.5 2.09 
                       C13.09 3.81 14.76 3 16.5 3 
                       19.58 3 22 5.42 22 8.5 
                       c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-500 stroke-current"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 21.364 4.318 12.682a4.5 4.5 0 0 1 0-6.364z"
                  />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
