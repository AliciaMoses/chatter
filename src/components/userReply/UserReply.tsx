import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { api } from "~/utils/api";
import { useDeletePost } from "../deletePostModal/useDeletePost";
import { type UserReplyProps } from "./UserReply.types";
import { calculateRelativeTime } from "../userPost/UserPost.helpers";
import DeletePostModal from "../deletePostModal/deletePostModal";
import LikeButton from "../likeButton/LikeButton";
import DeleteButton from "../deleteButton/DeleteButton";

import styles from "./UserReply.module.css";
import CreateReply from "../createReply/CreateReply";
import ReplyButton from "../replyButton/ReplyButton";

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

  const [isPostReplyActive, setIsPostReplyActive] = useState(false);

  return (
    <>
     <div className={styles.replyContainer}>
      <Link href={`/post/${post.id}`}>
        <div className={styles.post} key={post.id}>
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
          <div className={styles.postBody}>
            <div className={styles.postContent}>{post.content}</div>
            <div className={styles.postDate}>{relativeTime}</div>
          </div>
          <div className={styles.postFooter}>
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
                <div className="flex-grow" />
              )}
              <button
                onClick={() => setIsPostReplyActive((prevState) => !prevState)}
              >
                {isPostReplyActive ? "Cancel" : <ReplyButton />}
              </button>
              {isPostReplyActive && (
                <CreateReply
                  onNewPostCreated={function () {
                    throw new Error("Function not implemented.");
                  }}
                  parentPostId={post.id}
                />
              )}
            </Link>
          </div>
        </div>
      </Link>
      </div>
      <br />
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
