import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/router";
import Link from "next/link";

import { api } from "~/utils/api";
import { useDeletePost } from "../../components/deletePostModal/useDeletePost";
import { type UserPostProps } from "./UserPost.types";
import { calculateRelativeTime } from "./UserPost.helpers";
import DeletePostModal from "../deletePostModal/deletePostModal";
import PostFooter from "./postFooter/PostFooter";
import PostHeader from "./postHeader/PostHeader";
import CreateReplyContainer from "../createReplyContainer/CreateReplyContainer";
import styles from "./UserPost.module.css";

const UserPost = (props: UserPostProps) => {
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
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpand = (event: React.MouseEvent): void => {
    event.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const handleNewPostCreated = () => {
    setIsExpanded(false);
  };


  return (
    <>
      <Link href={`/post/${post.id}`}>
        <div className={styles.post} key={post.id}>
          <PostHeader author={author} post={post} />
          <div className={styles.postBody}>
            <div className={styles.postContent}>{post.content}</div>
            <div className={styles.postDate}>{relativeTime}</div>
          </div>

          <PostFooter
            author={author}
            userLiked={userLiked}
            likes={likes}
            handleLikeClick={handleLikeClick}
            handleModalToggle={handleModalToggle}
            deleteButtonHref={deleteButtonHref} 
            handleExpand={handleExpand}         />
        </div>
      </Link>
      <CreateReplyContainer
        isExpanded={isExpanded}
        parentPostId={post.id}
        onNewPostCreated={handleNewPostCreated} 
      />
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

export default UserPost;
