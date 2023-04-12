import { RouterOutputs } from "~/utils/api";
import Link from "next/link";
import { api } from "~/utils/api";

type IndividualPost = RouterOutputs["posts"]["getAll"][number];

const UserPost = (props: IndividualPost) => {
  const { post, author } = props;

  const { data: likes } = api.posts.getPostLikes.useQuery({ postId: post.id });

  return (
    <Link href={`/post/${post.id}`}>
    <div data-testid="user-post" key={post.id} className="flex bg-slate-100 p-4 rounded-lg items-start">
      <div className="postAuthorImg mr-4">
        <Link href={`/@${author.username}`}>
          <img src={author.profileImageUrl} 
            alt="Author profile image"
            className="w-16 h-16 rounded-full object-cover"
          />
        </Link>
      </div>
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <Link href={`/post/${post.id}`}>
            <span className="postContent text-xl font-bold mb-2">{post.content}</span>
          </Link>
          <Link href={`/@${author.username}`}>
            <span className="postAuthor text-gray-500">-{author.username}</span>
          </Link>
        </div>
        <div className="flex justify-center">
          <span className="text-gray-500">{likes} likes</span>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default UserPost;
