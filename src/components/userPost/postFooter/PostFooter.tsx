import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/clerk-react";

import LikeButton from "../../likeButton/LikeButton";
import DeleteButton from "../../deleteButton/DeleteButton";


import { type UserPostProps } from "../UserPost.types";

interface PostFooterProps {
  author: UserPostProps["author"];
  userLiked: boolean;
  likes: number;
  handleLikeClick: (event: React.MouseEvent) => void;
  handleModalToggle: () => void;
  deleteButtonHref: string;
  setIsPostReplyActive: (active: boolean) => void;
  isPostReplyActive: boolean;
}
const PostFooter: React.FC<PostFooterProps> = ({
  author,
  userLiked,
  likes,
  handleLikeClick,
  handleModalToggle,
  deleteButtonHref,

}) => {
  const { user } = useUser();
  return (
    <div className="postFooter">
      <Link href="">
        <LikeButton
          userLiked={userLiked}
          likes={likes}
          onClick={(event) => handleLikeClick(event)}
        />
      </Link>

      <Link href="">
        {user && user.id === author.id ? (
          <Link href={deleteButtonHref}>
            <DeleteButton
              onDeleteClick={handleModalToggle}
              deleteButtonHref={deleteButtonHref}
            />
          </Link>
        ) : (
          <div className="" />
        )}
      </Link>
    </div>
  );
};

export default PostFooter;
