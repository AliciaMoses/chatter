import React, { useState } from "react";
import type { RouterOutputs } from "~/utils/api";
import Link from "next/link";
import { api } from "~/utils/api";
import Image from "next/image";
import { differenceInDays } from "date-fns";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@clerk/clerk-react";
import { useDeletePost } from "../../components/deletePostModal/useDeletePost";
import DeletePostModal from "../deletePostModal/deletePostModal";
import { useRouter } from "next/router";
import styles from "./UserPost.module.css";
import LikeButton from "../likeButton/LikeButton";
import DeleteButton from "../deleteButton/DeleteButton";
type IndividualPost = RouterOutputs["posts"]["getAll"][number];

const UserPost = (props: IndividualPost & { onPostDeleted?: () => void }) => {
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
  const daysDifference = differenceInDays(new Date(), postDate);
  const relativeTime =
    daysDifference < 2
      ? formatDistanceToNow(postDate, {
          addSuffix: true,
        })
      : postDate.toLocaleDateString();

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };

  const toggleLikeMutation = api.posts.toggleLike.useMutation({
    onSuccess: () => {
      refetchLikes()
        .then(() => refetchUserLike())
        .catch((error) => console.error("Error", error));
    },
  });

  const userLiked = userLike && userLike.isLiked;

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

  const handleDeleteClick = () => {
    handleDelete().catch((error) => {
      console.error("Error occurred while deleting the post: ", error);
    });
  };

  const handleDelete = async (): Promise<void> => {
    await deletePost(post.id, author.id);
    handleModalToggle();
    props.onPostDeleted && props.onPostDeleted();
  };

  const router = useRouter();
  const deleteButtonHref = router.asPath;

  return (
    <>
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
                  className="rounded-full object-cover"
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
            </Link>
          </div>
        </div>
        </Link>
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

export default UserPost;
