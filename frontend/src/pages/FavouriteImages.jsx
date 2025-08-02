import { useEffect, useState } from "react";
import moment from "moment";
import { getAllFavorites } from "../services/ImageService";
import Loader from "../components/Loader";

export default function FavouriteImages() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllFavorites()
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        My Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorite images found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.map((img) => (
            <div key={img._id} className="relative group">
              <img
                src={img.cloudUrl}
                alt={img.name}
                className="w-full h-60 object-cover rounded shadow"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs px-2 py-1">
                <div>{img.albumId?.name}</div>
                <div>{moment(img.uploadedAt).format("MMM D, YYYY")}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
