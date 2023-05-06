import React from "react";
import { api } from "~/utils/api";
import UserReply from "../userReply/UserReply";
import { useRouter } from "next/router";
import Link from "next/link";

type RepliesContainerProps = {
  parentPostId: string;
  onRepliesUpdated: () => void;
};


const RepliesContainer: React.FC<RepliesContainerProps> = ({
  parentPostId,
  onRepliesUpdated,
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
    <>
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
                onRepliesUpdated={onRepliesUpdated}
              />
            );
          })}
      {router.pathname === "/feed" &&
        replies &&
        replies.length > maxRepliesToShow && (
          <Link href={`/post/${parentPostId}`}>
            <button className="inline-flex items-center mr-2 shadow-md shadow-violet-300 hover:bg-violet-200 text-violet-950 font-bold py-2 px-4 border-b-4 hover:border-violet-800 rounded focus:outline-none border-2 border-violet-800 focus:ring-4 focus:ring-violet-300 dark:bg-violet-100 dark:hover:bg-violet-200 dark:focus:ring-violet-800">
              <span className="mr-2">View Entire Thread...</span>
              <svg
                className="ml-2 h-6 w-6 text-violet-950"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
              </svg>
            </button>
          </Link>
          
        )}
        <hr className="my-8 h-0.5 pt-0.5 pb-0.2  bg-violet-100 opacity-5" />
    </div>
    
    </>
  );
};

export default RepliesContainer;
