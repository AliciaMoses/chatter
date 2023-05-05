import React from "react";
import { api } from "~/utils/api";
import UserReply from "../userReply/UserReply";
import { useRouter } from "next/router";
import Link from "next/link";



type RepliesContainerProps = {
  parentPostId: string;
};

const RepliesContainer: React.FC<RepliesContainerProps> = ({ parentPostId }) => {
  const { data: replies } = api.posts.getReplies.useQuery(
    {
      parentPostId: parentPostId,
    },
    {
      onSuccess: (data) => {
        console.log("Replies data onSuccess:", data);
      },
      onError: (error) => {
        console.error("Error fetching replies:", error);
      },
    }
  );
  console.log("RepliesContainer parentPostId:", parentPostId);
  console.log("Replies data:", replies);

 
  const router = useRouter();
  const maxRepliesToShow = router.pathname === "/feed" ? 3 : replies?.length || 3;

  return (
    <div className="repliesContainer flex-grow">
      {replies &&
        replies.slice(0, maxRepliesToShow).map((reply) => {
          console.log("Rendering UserReply:", reply.post.id);
          return (
            <UserReply
              key={reply.post.id}
              post={reply.post}
              author={reply.author}
              parentPostId={parentPostId}
            />
          );
        })}
      {router.pathname === "/feed" && replies && replies.length > maxRepliesToShow && (
        <Link href={`/post/${parentPostId}`}>
        
            View Thread
          
        </Link>
      )}
    </div>
  );
};

export default RepliesContainer;