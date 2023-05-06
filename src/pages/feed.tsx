import { useUser } from "@clerk/nextjs";
import type { NextPage } from "next";
import Head from "next/head";
import { api } from "../utils/api";
import Navbar from "~/components/navbar/Navbar";
import CreatePost from "~/components/createPost/CreatePost";
import { useState, useEffect } from "react";
import PostContainer from "~/components/postContainer/PostContainer";

const FeedPage: NextPage = () => {
  const user = useUser();
  const { data, refetch } = api.posts.getAllWithReplies.useQuery();

  const [feedUpdated, setFeedUpdated] = useState(false);

  useEffect(() => {
    if (feedUpdated) {
      void refetch();
      setFeedUpdated(false);
    }
  }, [feedUpdated, refetch]);

  const handleFeedUpdate = () => {
    setFeedUpdated(true);
  };

  return (
    <>
      <Head>
        <title>Chatter - Feed</title>
        <meta name="description" content="Welcome to the Chattersphere" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="py-869 flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl space-y-4">
          <div>
            {user.isSignedIn && (
              <CreatePost onNewPostCreated={handleFeedUpdate} />
            )}
          </div>
          <br />
          {data
            ?.filter((individualPost) => !individualPost.post.parentPostId)
            .map((individualPost) => {
              console.log("Rendering PostContainer:", individualPost.post.id);
              return (
                <PostContainer
                  {...individualPost}
                  key={individualPost.post.id}
                  onPostDeleted={handleFeedUpdate}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default FeedPage;
