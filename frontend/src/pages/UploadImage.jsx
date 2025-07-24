import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UploadToAllImages() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");
  const [person, setPerson] = useState("");
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
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", tags);
    formData.append("person", person);

    try {
      await axios.post("http://localhost:4000/albums/images/upload", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Uploaded!");
      navigate("/photos");
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-30 h-30 object-cover rounded shadow"
          />
        )}
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma-separated)"
          className="border p-2 w-full"
        />
        <input
          value={person}
          onChange={(e) => setPerson(e.target.value)}
          placeholder="Person"
          className="border p-2 w-full"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          type="submit"
        >
          Upload to My Photos
        </button>
      </form>
    </div>
  );
}
