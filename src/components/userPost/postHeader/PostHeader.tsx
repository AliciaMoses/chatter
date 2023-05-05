import React from "react";
import Link from "next/link";
import Image from "next/image";

import { type UserPostProps } from "../UserPost.types";
import styles from "../../userPost/UserPost.module.css"
const PostHeader: React.FC<UserPostProps> = ({ author }) => {
  return (
    <>
      <div className={styles.postHeader}>
        <div className="postAvatar">
          <Link href={`/profile/@${author.username}`}>
            <Image
              src={author.profileImageUrl}
              alt="Author profile image"
              width={64}
              height={64}
              className="rounded-full object-cover shadow-md shadow-violet-700 ring-2 ring-violet-800 ring-offset-2"
            />
          </Link>
        </div>
        <Link href={`/profile/@${author.username}`}>
          <div className={styles.postUsername}>@{author.username}</div>
        </Link>
      </div>
    </>
  );
};

export default PostHeader;
