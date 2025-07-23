import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAlbums } from "../services/AlbumService";

export default function AlbumList() {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getAlbums().then((res) => setAlbums(res.data));
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Albums</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {albums.map((album) => (
          <div
            key={album._id}
            onClick={() => navigate(`/albums/${album._id}`)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            {/* Placeholder image or use album.coverPhotoUrl if available */}
            <div className="h-70 bg-gray-200 flex items-center justify-center text-gray-400">
             
              <img src={album.coverPhotoUrl} className="h-70 w-full object-cover" alt="cover image" />
            </div>

            <div className="p-3">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {album.name}
              </h3>
              {/* <p className="text-gray-600 text-sm mt-1 truncate">
                {album.description}
              </p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
