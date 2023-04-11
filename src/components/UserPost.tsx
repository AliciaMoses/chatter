import { RouterOutputs } from "~/utils/api";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/utils/api";

type IndividualPost = RouterOutputs["posts"]["getAll"][number];

const UserPost = (props: IndividualPost) => {
  const { post, author } = props;

  const { data: likes } = api.posts.getPostLikes.useQuery({ postId: post.id });

  return (
    <div key={post.id}>
      <Link href={`/post/${post.id}`}>
        <span>{post.content}</span>
      </Link>
      <Link href={`/@${author.username}`}>
        <span>@{author.username}</span>
      </Link>
      {author.profileImageUrl}
      <div>
        
        <span>{likes} likes</span>
      </div>
    </div>
  );
};

export default UserPost;
