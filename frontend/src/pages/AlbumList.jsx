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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4">My Albums</h2>
        <button
          className="hover:border p-1 rounded-xl px-4 py-2 cursor-pointer"
          onClick={() => navigate("/albums/new")}
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
            <span>Create Album</span>
          </div>
        </button>
      </div>
      <hr className="py-3" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {albums.map((album) => (
          <div
            key={album._id}
            onClick={() => navigate(`/albums/${album._id}`)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="h-70 bg-gray-200 flex items-center justify-center text-gray-400">
              <img
                src={album.coverPhotoUrl}
                className="h-70 w-full object-cover"
                alt="cover image"
              />
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
