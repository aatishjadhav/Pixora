import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImages } from "../services/ImageService";
import { getAlbumById } from "../services/AlbumService";
import moment from "moment";

export default function AlbumDetail() {
  const navigate = useNavigate();
  const { albumId } = useParams();
  const [images, setImages] = useState([]);
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    getImages(albumId).then((res) => setImages(res.data));
    getAlbumById(albumId).then((res) => setAlbum(res.data));
  }, [albumId]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {album && (
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800">{album.name}</h2>
            <button
              className="hover:border p-1 rounded-xl px-4 py-2 cursor-pointer border border-gray-300"
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
          </div>
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
            <img
              src={img.cloudUrl}
              alt={img.name}
              className="w-full h-60 object-cover rounded shadow-sm"
            />
            {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-xs p-1 truncate">
              {img.name}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
