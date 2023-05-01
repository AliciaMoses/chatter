import { api } from "~/utils/api";

import UserPost from "../userPost/UserPost";

type Posts = {
  id: string;
  createdAt: Date;
  content: string;
  authorId: string;
};

const LikedPosts: React.FC<{ userId: string }> = ({ userId }) => {


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
       <div className="py-869 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
       <div className="w-full max-w-xl space-y-4">
      {!likedPostsLoading &&
    
        likedPosts?.map((likedPost) => (
          
          <UserPost
            key={likedPost.post.id}
            post={likedPost.post}
            author={likedPost.author}
          />
        ))}
        </div>
    </div>
    </>
  );
};

export default LikedPosts;
