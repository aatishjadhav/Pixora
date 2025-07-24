import { useEffect, useState } from "react";
import { getAllImages } from "../services/ImageService";
import moment from "moment";

export default function HomePage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getAllImages().then((res) => setImages(res.data));
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Photos</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="relative group">
            <img
              src={img.cloudUrl}
              alt={img.name}
              className="w-full h-60 object-cover rounded shadow"
            />

            <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md shadow-sm">
              {moment(img.uploadedAt).format("MMMM D, YYYY")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
