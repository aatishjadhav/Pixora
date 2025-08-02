import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  getComments,
  addComment,
  editComment,
  deleteComment,
} from "../services/ImageService";
import { BASE_URL } from "../config";
import moment from "moment";
import { AuthContext } from "../contexts/AuthContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useContext } from "react";

export default function ImageDetail() {
  const { imageId } = useParams();
  const [image, setImage] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/images/${imageId}`, { withCredentials: true })
      .then((res) => setImage(res.data));

    loadComments();
  }, [imageId]);

  const loadComments = async () => {
    const res = await getComments(imageId);
    setComments(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await addComment(imageId, text);
    setText("");
    loadComments();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {image && (
        <>
          <img
            src={image.cloudUrl}
            alt={image.name}
            className="w-full max-w-3xl aspect-video object-cover rounded-xl mb-6 shadow-xl mx-auto"
          />
          <h2 className="text-xl font-semibold mb-4">Comments</h2>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-white border rounded-lg p-3 shadow-sm"
              >
                {editingId === comment._id ? (
                  <>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full border rounded p-2 mb-2"
                    />
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                        onClick={async () => {
                          await editComment(imageId, comment._id, editText);
                          setEditingId(null);
                          loadComments();
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="px-3 py-1 bg-gray-300 rounded"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-800">{comment.text}</p>
                    <div className="text-xs text-gray-500 mt-1 flex justify-between items-center">
                      <span>
                        — {comment.userId.name} (
                        {moment(comment.createdAt).fromNow()})
                      </span>
                      {comment.userId._id === user._id && (
                        <div className="flex gap-2 items-center">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => {
                              setEditingId(comment._id);
                              setEditText(comment.text);
                            }}
                            title="Edit Comment"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={async () => {
                              await deleteComment(imageId, comment._id);
                              loadComments();
                            }}
                            title="Delete Comment"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="mt-10">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add your comment..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring"
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
}
