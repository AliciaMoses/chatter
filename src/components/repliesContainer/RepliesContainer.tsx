import React from "react";
import { api } from "~/utils/api";
import UserReply from "../userReply/UserReply";
import { useRouter } from "next/router";
import Link from "next/link";

type RepliesContainerProps = {
  parentPostId: string;
};

const RepliesContainer: React.FC<RepliesContainerProps> = ({
  parentPostId,
}) => {
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
  const maxRepliesToShow =
    router.pathname === "/feed" ? 3 : replies?.length || 3;

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
      {router.pathname === "/feed" &&
        replies &&
        replies.length > maxRepliesToShow && (
          <Link href={`/post/${parentPostId}`}>
            <svg
              className="h-6 w-6 text-black"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />{" "}
              <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
            </svg>  View Thread
           
          </Link>
        )}
    </div>
  );
};

export default RepliesContainer;
