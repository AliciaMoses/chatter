import React from "react";
import Link from "next/link";
import Image from "next/image";

import { type UserReplyProps } from "../UserReply.types";
import styles from "../UserReply.module.css"

const ReplyHeader: React.FC<UserReplyProps> = ({ author }) => {
  return (
    <>
      <div className={styles.replyHeader}>
        <div className="postAvatar">
          <Link href={`/profile/@${author.username}`}>
            <Image
              src={author.profileImageUrl}
              alt="Author profile image"
              width={48}
              height={48}
              className="rounded-full object-cover shadow-md shadow-violet-700 ring-2 ring-violet-300 ring-offset-2"
            />
          </Link>
        </div>
        <Link href={`/profile/@${author.username}`}>
          <div className={styles.replyUsername}>@{author.username}</div>
        </Link>
      </div>
    </>
  );
};

export default ReplyHeader;
