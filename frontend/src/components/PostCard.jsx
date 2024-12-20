import React from "react";
import { useNavigate } from "react-router-dom";
import ReadMoreButton from "./Buttons/ReadMoreButton";

const PostCard = ({ post, currentUser, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const MAX_CONTENT_LENGTH = 150; // Maximum characters for content

  const getTruncatedContent = (content) => {
    if (content.length > MAX_CONTENT_LENGTH) {
      return `${content.substring(0, MAX_CONTENT_LENGTH)}...`;
    }
    return content;
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6 flex flex-col justify-between h-full">
        {/* Title */}
        <h2
          className="text-xl font-semibold text-gray-800 mb-2 truncate"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {post.title}
        </h2>
        {/* Content */}
        <p className="text-gray-600 text-sm flex-grow">
          {getTruncatedContent(post.content)}
        </p>
        {/* Buttons */}
        <div className="mt-4 flex justify-between items-center">
          <ReadMoreButton onClick={() => navigate(`/posts/${post._id}`)} />

          {currentUser && post.owner === currentUser.user._id && (
            <div className="flex flex-col items-center rounded-sm overflow-hidden border-none  w-max">
              <button
                className="w-24 bg-yellow-400 text-white px-4 py-1 hover:bg-yellow-500 transition rounded-t-xl"
                onClick={() => onEdit(post)}
              >
                Edit
              </button>
              <button
                className="w-24 bg-red-500 text-white px-4 py-1 hover:bg-red-600 transition rounded-b-xl"
                onClick={() => onDelete(post._id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
