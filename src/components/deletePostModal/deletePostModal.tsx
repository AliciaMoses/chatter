import React from "react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      <div className="relative mx-auto w-auto max-w-3xl">
        <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg">
          <div className="relative flex-auto p-6">{children}</div>
          <div className="absolute right-0 top-0 p-2 ">
            <button
              className="rounded border-0 px-4 py-2 text-slate-600 hover:text-red-600 focus:outline-none"
              onClick={onClose}
            >
              <svg
                className="h-8 w-8 text-red-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <circle cx="12" cy="12" r="10" />{" "}
                <line x1="15" y1="9" x2="9" y2="15" />{" "}
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-end rounded-b border-t border-solid border-gray-300 p-6">
            <button
              className="mr-2 rounded border-0 bg-rose-400 px-4 py-2 text-slate-800 hover:bg-red-600 focus:outline-none"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="rounded border-0 bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:outline-none"
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
