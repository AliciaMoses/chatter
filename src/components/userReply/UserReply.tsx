import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/router";
import Link from "next/link";


import { api } from "~/utils/api";
import { useDeletePost } from "../deletePostModal/useDeletePost";
import { type UserReplyProps } from "./UserReply.types";
import { calculateRelativeTime } from "../userPost/UserPost.helpers";
import DeletePostModal from "../deletePostModal/deletePostModal";


import styles from "./UserReply.module.css";

import ReplyHeader from "./replyHeader/ReplyHeader";
import ReplyFooter from "./replyFooter/ReplyFooter";

const UserReply = (props: UserReplyProps) => {
  const { user } = useUser();
  const { deletePost } = useDeletePost();
  const { post, author } = props;

  const { data: likes, refetch: refetchLikes } =
    api.posts.getPostLikes.useQuery({ postId: post.id });

  const { data: userLike, refetch: refetchUserLike } =
    api.posts.getUserLike.useQuery({
      postId: post.id,
      userId: user?.id,
    });

  const postDate = new Date(post.createdAt);
  const relativeTime = calculateRelativeTime(postDate);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const deleteButtonHref = router.asPath;
  const userLiked = userLike && userLike.isLiked;

  const toggleLikeMutation = api.posts.toggleLike.useMutation({
    onSuccess: () => {
      refetchLikes()
        .then(() => refetchUserLike())
        .catch((error) => console.error("Error", error));
    },
  });
  const likePost = async (): Promise<void> => {
    try {
      if (!user) {
        return;
      }
      return await toggleLikeMutation.mutateAsync({ postId: post.id });
    } catch (error) {
      throw error;
    }
  };
  const handleLikeClick = (event: React.MouseEvent): void => {
    event.preventDefault();
    likePost()
      .then()
      .catch((result) => {
        console.error("error", result);
      });
  };
  const handleDelete = async (): Promise<void> => {
    await deletePost(post.id, author.id);
    handleModalToggle();
    props.onPostDeleted && props.onPostDeleted();
  };
  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };
  const handleDeleteClick = () => {
    handleDelete().catch((error) => {
      console.error("Error occurred while deleting the post: ", error);
    });
  };

  return (
    <>
     <div className={`${styles.replyContainer ?? ""} ${styles.replySpacing ?? ""}`}>
      <Link href={`/post/${post.id}`}>
        <div className={styles.reply} key={post.id}>
          <ReplyHeader author={author} post={post} parentPostId={""} onRepliesUpdated={function (): void {
              throw new Error("Function not implemented.");
            } }/>
          <div className={styles.replyBody}>
            <div className={styles.replyContent}>{post.content}</div>
            <div className={styles.replyDate}>{relativeTime}</div>
          </div>
          <ReplyFooter
            author={author}
            userLiked={userLiked}
            likes={likes}
            handleLikeClick={handleLikeClick}
            handleModalToggle={handleModalToggle}
            deleteButtonHref={deleteButtonHref}
          />
        </div>
      </Link>
      </div>
      
      <DeletePostModal
        isOpen={modalOpen}
        onClose={handleModalToggle}
        onDelete={handleDeleteClick}
      >
        <h2 className="text-2xl font-bold">Confirm Delete</h2>
        <p>Are you sure you want to delete this post?</p>
      </DeletePostModal>
    </>
  );
};

export default UserReply;
