import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { FaUserCircle, FaPencilAlt, FaUpload, FaImage } from "react-icons/fa"; // Import FaImage for image select icon

const Dashboard = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const userData = useSelector((state) => state.auth.user);
  const [posts, setPosts] = useState([]);
  const [avatar, setAvatar] = useState(null); // State to handle new avatar
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [currAvatar, setCurrAvatar] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/posts/`, {
          headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
        });
        setPosts(response.data.data.posts);
      } catch (err) {
        console.error("Error fetching posts", err);
      }
    };

    fetchPosts();
    getCurrUser();
  }, [navigate]);

  const getCurrUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/users/curr-user`, {
        headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
      });
      setCurrAvatar(response.data.data.avatar);
    } catch (err) {
      console.error("Error fetching posts", err);
    }
  };

  // Handle avatar file change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  // Handle avatar update
  const handleAvatarUpdate = async () => {
    if (!avatar) {
      alert("Please select a new avatar image.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      const response = await axios.put(
        `${baseUrl}/api/users/update-avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAvatar(null); // Clear selected avatar
      console.log("avatar:", response.data.data);

      alert("Avatar updated successfully,Reload page");
    } catch (error) {
      console.error("Error updating avatar", error);
      alert("Failed to update avatar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto px-4 py-6 bg-gray-100">
      {/* User Info Section */}
      <div className="bg-gray-100 shadow-md rounded-lg p-6 mb-6 flex flex-col sm:flex-row items-center sm:space-x-6">
        <img
          src={currAvatar || "/default-avatar.png"}
          alt="User Avatar"
          className="w-16 h-16 rounded-full border-2 border-indigo-600"
        />
        <div className="mt-4 sm:mt-0">
          <h2 className="text-2xl font-semibold text-gray-800">
            {userData.user.fullName}
          </h2>
          <p className="text-gray-500">{userData.user.email}</p>
        </div>

        {/* Update Avatar Section */}
        <div className="mt-4 sm:mt-0 sm:ml-auto flex items-center space-x-4">
          <label htmlFor="avatar-upload" className="cursor-pointer">
            {/* Image select icon */}
            <FaImage className="text-orange-600 text-2xl" />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <label
            htmlFor="avatar-upload"
            className="cursor-pointer text-gray-700 hover:text-orange-600"
          >
            Select Image
          </label>

          <button
            onClick={handleAvatarUpdate}
            className="flex items-center bg-gray-200 text-gray-700 px-6 py-2 hover:bg-gray-300 transition duration-300 rounded-2xl"
            disabled={loading}
          >
            <FaUpload className="mr-2" />
            {loading ? "Updating..." : "Update Avatar"}
          </button>
        </div>
      </div>

      {/* Dashboard Title */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Your Dashboard
      </h2>

      {/* Create Post Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/posts/create")}
          className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          <FaPencilAlt className="mr-2" />
          Create New Post
        </button>
      </div>

      {/* Posts Section */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Your Posts
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <li
                key={post._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                onClick={() => navigate(`/post/${post._id}`)}
              >
                {/* Post Image */}
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h4 className="text-xl font-semibold text-gray-700">
                    {post.title}
                  </h4>
                  <p className="text-gray-500 mt-2">
                    {post.content.slice(0, 100)}...
                  </p>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500 col-span-3">No posts available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
