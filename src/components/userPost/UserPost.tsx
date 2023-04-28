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
import { useRouter } from 'next/router';

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
        <div
          key={post.id}
          className="flex flex-col rounded-lg  border-solid  border-violet-800 border-2  p-4 shadow-lg shadow-violet-300 "
        >
          <div className="mb-4 flex">
            <div className="postAuthorImg mr-4">
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
             
            <div>
            <br></br>
              <Link href={`/post/${post.id}`}>
                <span className="postContent mb-2 text-2xl font-semibold text-slate-800">
                  {post.content}
                </span>
              </Link>
             
              <Link href={`/profile/@${author.username}`}>
                <div>
                  <br></br>
                  <span className="postAuthor font-mono text-sm text-violet-500">
                    @{author.username}
                  </span>
                  <span className="ml-2  font-mono text-sm  font-extralight  text-gray-400">
                    {relativeTime}
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <br />
          <div className="flex w-full items-center justify-between">
            <Link href="">
              <button
                onClick={(event) => handleLikeClick(event)}
                className={`h-6 w-6 ${
                  userLiked ? "font-bold text-violet-400 " : "text-slate-300 hover:text-indigo-400"
                }`}
              >
               
                  <svg
                    className="h-8 w-8"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
            
                   
                    <path d="M7 11v 8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
                  </svg>
                <span
                  className={`h-6 w-6  font-mono ${
                    userLiked ? "text-violet-600" : "text-slate-500"
                  }`}
                >
                {likes}
                </span>
              </button>
            </Link>
            <Link href="">
            {user && user.id === author.id && (
               <Link href={deleteButtonHref}>
                <button
                  onClick={handleModalToggle}
                  className="rounded-md  px-2 py-1 font-mono text-sm text-slate-300 hover:text-rose-300"
                >
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </Link>
            )}
             </Link>
          </div>
          
        </div>
       
      </Link>
      <br></br>
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
