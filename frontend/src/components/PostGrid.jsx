import React from "react";
import PostCard from "./PostCard";

const PostGrid = ({ posts, currentUser, onEdit, onDelete }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          currentUser={currentUser}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PostGrid;
