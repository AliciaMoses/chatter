import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/clerk-react";

import LikeButton from "../../likeButton/LikeButton";
import DeleteButton from "../../deleteButton/DeleteButton";

import { type UserReplyProps } from "../UserReply.types";

import styles from "../UserReply.module.css"
interface ReplyFooterProps {
  author: UserReplyProps["author"];
  userLiked?: boolean;
  likes?: number;
  handleLikeClick: (event: React.MouseEvent) => void;
  handleModalToggle: () => void;
  deleteButtonHref: string;
}

const ReplyFooter: React.FC<ReplyFooterProps> = ({
  author,
  userLiked,
  likes,
  handleLikeClick,
  handleModalToggle,
  deleteButtonHref,
}) => {
  const { user } = useUser();
  return (
    <div className={styles.replyFooter}>
      <Link href="">
        <LikeButton
          userLiked={userLiked}
          likes={likes}
          onClick={(event) => handleLikeClick(event)}
        />
      </Link>

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

export default ReplyFooter;
