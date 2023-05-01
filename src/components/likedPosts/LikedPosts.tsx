import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import UserPost from "../userPost/UserPost";

type Posts = {
  id: string;
  createdAt: Date;
  content: string;
  authorId: string;
};

const LikedPosts: React.FC = () => {
  const { user } = useUser();
  const userId = user?.id || "";

  const { data: likedPosts, isLoading: likedPostsLoading } =
    api.posts.getLikedPostsByUserId.useQuery<
      {
        post: Posts;
        author: {
          username: string;
          id: string;
          profileImageUrl: string;
          externalUsername: string | null;
        };
      }[]
    >(userId);

  return (
    <>
      {!likedPostsLoading &&
        likedPosts?.map((likedPost) => (
          <UserPost
            key={likedPost.post.id}
            post={likedPost.post}
            author={likedPost.author}
          />
        ))}
    </>
  );
};

export default LikedPosts;
