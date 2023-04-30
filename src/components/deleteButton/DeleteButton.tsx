import React from 'react';
import Link from 'next/link';
import DeleteIcon from './DeleteIcon';

type DeleteButtonProps = {
  onDeleteClick: () => void;
  deleteButtonHref: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDeleteClick, deleteButtonHref }) => {
  return (
    <Link href={deleteButtonHref}>
      <button
        onClick={onDeleteClick}
        className="  text-sm  text-slate-300 hover:text-rose-300"
      >
        <DeleteIcon />
      </button>
    </Link>
  );
};

export default DeleteButton;
