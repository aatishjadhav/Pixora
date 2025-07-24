import { useState } from "react";
import axios from "axios";

export default function ShareAlbumModal({ albumId, onClose }) {
  const [emails, setEmails] = useState("");

  const handleShare = async () => {
    const emailList = emails.split(",").map(e => e.trim());
    try {
      await axios.post(`http://localhost:4000/albums/${albumId}/share`, {
        emails: emailList
      }, { withCredentials: true });

      alert("Album shared successfully.");
      onClose();
    } catch (err) {
      alert("Failed to share album.");
      console.error(err);
    }
  };

  return (
    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl relative">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        onClick={onClose}
      >
        &times;
      </button>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Share Album</h2>
      <p className="text-sm text-gray-600 mb-2">Enter email addresses (comma-separated)</p>
      <textarea
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        rows={3}
        className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="e.g. tejas@example.com, neha@gmail.com"
      />
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleShare}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Share
        </button>
      </div>
    </div>
  );
}
