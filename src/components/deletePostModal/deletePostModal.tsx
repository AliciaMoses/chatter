
import React from 'react';

type DeletePostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  children: React.ReactNode;
};

const DeletePostModal = ({
  isOpen,
  onClose,
  onDelete,
  children,
}: DeletePostModalProps) => {
  if (!isOpen) return null;

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-3xl mx-auto">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg">
          <div className="relative p-6 flex-auto">{children}</div>
          <div
            className="absolute top-0 right-0 p-2 "
          >
            <button className="px-4 py-2 text-slate-600 border-0 rounded hover:text-red-600 focus:outline-none"
              onClick={onClose}
            >
              x
            </button>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
            <button
              className="px-4 py-2 mr-2 text-white bg-red-500 border-0 rounded hover:bg-red-600 focus:outline-none"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="px-4 py-2 text-white bg-gray-500 border-0 rounded hover:bg-gray-600 focus:outline-none"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;