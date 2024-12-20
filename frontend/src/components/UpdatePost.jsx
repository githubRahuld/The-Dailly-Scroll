import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineUpload } from "react-icons/ai";

const UpdatePost = ({ postId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing post details on component mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/posts/${postId}`
        );
        const post = response.data.data;
        setTitle(post.title);
        setContent(post.content);
        setExistingImage(post.image);
      } catch (err) {
        setError("Failed to fetch post details");
      }
    };

    fetchPost();
  }, [postId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      const response = await axios.put(
        `http://localhost:5000/posts/${postId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setLoading(false);
      alert("Post updated successfully!");
    } catch (err) {
      setLoading(false);
      setError("Failed to update post");
    }
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Update Post</h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <div className="flex items-center">
            {existingImage && !image && (
              <img
                src={existingImage}
                alt="Existing Post"
                className="w-16 h-16 object-cover mr-4"
              />
            )}
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="mr-4"
            />
            <label
              htmlFor="image"
              className="cursor-pointer text-gray-500 hover:text-gray-700 flex items-center"
            >
              <AiOutlineUpload className="mr-2" />
              Upload New Image
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-md font-medium ${
            loading ? "opacity-50" : "hover:bg-indigo-700"
          }`}
        >
          {loading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
