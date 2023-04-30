import React from 'react';
import LikeIcon from './LikeIcon';

interface LikeButtonProps {
  userLiked?: boolean;
  likes?: number;
  onClick: (event: React.MouseEvent) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ userLiked, likes, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex ${
        userLiked
          ? 'font-bold text-violet-400'
          : 'text-slate-300 hover:text-violet-400'
      }`}
    >
      <LikeIcon />
      <span
        className={`h-6 w-6 font-mono ${
          userLiked ? 'text-violet-600' : 'text-slate-500'
        }`}
      >
        {likes}
      </span>
    </button>
  );
};

export default LikeButton;