import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UploadImage() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");
  const [person, setPerson] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const img = e.target.files[0];
    setFile(img);
    if (img) {
      setPreview(URL.createObjectURL(img));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", tags);
    formData.append("person", person);
    formData.append("isFavorite", isFavorite);

    try {
      await axios.post(
        `http://localhost:4000/albums/${albumId}/images`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Image uploaded");
      navigate(`/albums/${albumId}`);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Upload Image</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 shadow rounded"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:border file:border-gray-300 file:rounded file:bg-gray-100 hover:file:bg-gray-200"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-60 object-cover rounded shadow"
          />
        )}

        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          value={person}
          onChange={(e) => setPerson(e.target.value)}
          placeholder="Person name"
          className="w-full border p-2 rounded"
        />

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={isFavorite}
            onChange={(e) => setIsFavorite(e.target.checked)}
          />
          Mark as favorite
        </label>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded cursor-pointer"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
