import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import PostGrid from "../components/PostGrid";
import EditModal from "../components/EditModal";
import PaginationControls from "../components/PaginationControls";

function Home() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [editPost, setEditPost] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    image: null,
  });

  const currentUser = useSelector((state) => state.auth.user);

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/posts/fetch-all`, {
        params: { page, limit: 9 },
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      setPosts(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch posts. Please try again later.");
      setLoading(false);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editForm.title);
      formData.append("content", editForm.content);
      if (editForm.image) {
        formData.append("image", editForm.image);
      }

      await axios.put(`${baseUrl}/api/posts/${editPost._id}`, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      fetchPosts(currentPage);
      setEditPost(null);
    } catch (err) {
      console.error("Failed to update post:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await axios.delete(`${baseUrl}/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      fetchPosts(currentPage);
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Failed to delete post. Please try again.");
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loader animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16"></div>
          <p className="mt-4 text-lg font-semibold text-blue-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-8 drop-shadow-lg animate-pulse">
          Welcome to Our Blog
        </h1>

        <PostGrid
          posts={posts}
          currentUser={currentUser}
          onEdit={(post) => {
            setEditPost(post);
            setEditForm({
              title: post.title,
              content: post.content,
              image: null,
            });
          }}
          onDelete={handleDelete}
        />
        {editPost && (
          <EditModal
            editForm={editForm}
            setEditForm={setEditForm}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditPost(null)}
          />
        )}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Home;
