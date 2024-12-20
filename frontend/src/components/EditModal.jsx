import React from "react";

const EditModal = ({ editForm, setEditForm, onSubmit, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit Post</h2>
        <input
          type="text"
          value={editForm.title}
          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          placeholder="Title"
        />
        <textarea
          value={editForm.content}
          onChange={(e) =>
            setEditForm({ ...editForm, content: e.target.value })
          }
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          rows="4"
          placeholder="Content"
        ></textarea>
        <input
          type="file"
          onChange={(e) =>
            setEditForm({ ...editForm, image: e.target.files[0] })
          }
          className="mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
