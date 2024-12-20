import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FaArrowLeft } from "react-icons/fa"; // Back icon

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/posts/${postId}`, {
          headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
        });
        setLoading(false);
        setPost(response.data.data);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching post details", err);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (loading || !post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loader animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16"></div>
          <p className="mt-4 text-lg font-semibold text-blue-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 mx-auto px-4 py-6">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate("/users/home")}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft className="mr-2 text-green-500" />
          Back to Dashboard
        </button>
      </div>

      {/* Post Content Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Post Image */}
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-80 object-cover"
          />
        )}

        <div className="p-6">
          {/* Post Title */}
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {post.title}
          </h2>

          {/* Post Author and Date */}
          <p className="text-sm text-gray-500 mb-4">
            <strong>{post.owner.username}</strong> |{" "}
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </p>

          {/* Post Content */}
          <p className="text-lg text-gray-700">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
