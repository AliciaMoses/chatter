import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/clerk-react";

import LikeButton from "../../likeButton/LikeButton";
import DeleteButton from "../../deleteButton/DeleteButton";
import ReplyButton from "~/components/replyButton/ReplyButton";
import { type UserPostProps } from "../UserPost.types";

import styles from "../UserPost.module.css"


interface PostFooterProps {
  author: UserPostProps["author"];
  userLiked?: boolean;
  likes?: number;
  handleLikeClick: (event: React.MouseEvent) => void;
  handleModalToggle: () => void;
  deleteButtonHref: string;
  handleExpand: (event: React.MouseEvent) => void; 
}

const PostFooter: React.FC<PostFooterProps> = ({
  author,
  userLiked,
  likes,
  handleLikeClick,
  handleModalToggle,
  deleteButtonHref,
  handleExpand
}) => {
  const { user } = useUser();
  return (
    <div className={styles.postFooter}>
      <Link href="">
        <LikeButton
          userLiked={userLiked}
          likes={likes}
          onClick={(event) => handleLikeClick(event)}
        />
      </Link>
      <div className="flex items-center space-x-2">
      <ReplyButton onClick={handleExpand} />
      <span className="cursor-pointer" onClick={handleExpand}>
        reply
      </span>
    </div>
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

      
    </div>
  );
};

export default PostFooter;