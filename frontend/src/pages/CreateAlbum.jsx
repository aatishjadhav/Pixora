import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateAlbum() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (cover) formData.append("cover", cover);

    const res = await axios.post("http://localhost:4000/albums", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Album created!");
    navigate("/albums");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Album name"
          className="border p-2 w-full"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 w-full"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Photo
          </label>
          <input
            type="file"
            accept="image/*"
            placeholder="upload cover photo"
            onChange={(e) => setCover(e.target.files[0])}
            className="text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:border file:border-gray-300 file:rounded file:bg-gray-100 hover:file:bg-gray-200"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Create Album
        </button>
      </form>
    </div>
  );
}
