import React, { useState } from "react";
import RepliesContainer from "../repliesContainer/RepliesContainer";
import UserPost from "../userPost/UserPost";
import { type UserPostProps } from "../userPost/UserPost.types";
import CreateReplyContainer from "../createReplyContainer/CreateReplyContainer";

const PostContainer: React.FC<UserPostProps> = ({ post, author, onPostDeleted }) => {
  const [isExpanded, setIsExpanded] = useState(false);


  const onNewPostCreated = () => {
    setIsExpanded(false);

  };


  return (
    <div className="postContainer flex-grow">
      <UserPost post={post} author={author} onPostDeleted={onPostDeleted} />
  
      <CreateReplyContainer isExpanded={isExpanded} parentPostId={post.id} onNewPostCreated={onNewPostCreated} />
      <RepliesContainer parentPostId={post.id} />
    </div>
  );
};

export default PostContainer;
