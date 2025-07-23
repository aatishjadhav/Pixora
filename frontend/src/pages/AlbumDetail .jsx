import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImages } from "../services/ImageService";
import { getAlbumById } from "../services/AlbumService";
import moment from "moment";

export default function AlbumDetail() {
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
          <h2 className="text-3xl font-bold text-gray-800">{album.name}</h2>
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
