import type { RouterOutputs } from "~/utils/api";
import Link from "next/link";
import { api } from "~/utils/api";
import Image from "next/image";
import { differenceInDays } from "date-fns";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@clerk/clerk-react";

type IndividualPost = RouterOutputs["posts"]["getAll"][number];

const UserPost = (props: IndividualPost & { onPostDeleted?: () => void } ) => {
  const { user } = useUser();

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

  const toggleLikeMutation = api.posts.toggleLike.useMutation({
    onSuccess: () => {
      refetchLikes()
        .then(() => refetchUserLike())
        .catch((error) => console.error("Error", error));
    },
  });

  const deletePostMutation = api.posts.delete.useMutation({
    onSuccess: () => {
      console.log("post deleted")
      if (props.onPostDeleted) {
        props.onPostDeleted();
      }
    },
  });

  
  const deletePost = async (): Promise<void> => {
    try {
      if (!user || user.id !== author.id) {
        return;
      }
      return await deletePostMutation.mutateAsync({ postId: post.id });
    } catch (error) {
      throw error;
    }
  }; 

  const handleDeleteClick = (): void => {
    deletePost()
      .then()
      .catch((result) => {
        console.error("error", result);
      });
  };


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

  const handleLikeClick = (): void => {
    likePost()
      .then()
      .catch((result) => {
        console.error("error", result);
      });
  };

  return (
    <>
      <Link href={`/post/${post.id}`}>
        <div
          key={post.id}
          className="flex rounded-lg border border-solid border-slate-200  bg-slate-100 p-4 shadow-md"
        >
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
          <div className="">
            <div>
              <Link href={`/post/${post.id}`}>
                <span className="postContent mb-2 font-mono text-2xl">
                  {post.content}
                </span>
              </Link>

              <Link href={`/profile/@${author.username}`}>
                <div>
                  <span className="postAuthor font-mono text-sm text-gray-500">
                    @{author.username}
                  </span>
                  <span className="ml-2  font-mono text-sm  font-extralight  text-gray-400">
                    {relativeTime}
                  </span>
                </div>
              </Link>
            </div>
            <br></br>
            <div className="">
              <Link href="">
              <button
                onClick={handleLikeClick}
                className={`h-6 w-6 ${
                  userLiked ? "text-sky-500" : "text-gray-500"
                }`}
              >
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  />
                </svg>
                <span className={`h-6 w-6  font-mono ${
                  userLiked ? "text-sky-500" : "text-gray-500"
                }`}>{likes}</span>
              </button>
              </Link>
            </div>
            <div>
            {user && user.id === author.id && (
              <div className="ml-4">
                <Link href="">
                <button
                  onClick={handleDeleteClick}
                  className="text-red-500 bg-red-100 px-2 py-1 rounded-md font-mono text-sm"
                >
                  Delete
                </button>
                </Link>
              
              </div>
            )}
            </div>
          </div>
        </div>
      </Link>
      <br></br>
    </>
  );
}; 

export default UserPost;
