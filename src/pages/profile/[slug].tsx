import type { NextPage, GetServerSideProps } from "next";
import React, { useState } from "react";

import { api } from "~/utils/api";
import UserPost from "~/components/userPost/UserPost";
import NotFound from "~/components/notFound/NotFound";
import Navbar from "~/components/navbar/Navbar";
import LoadingPosts from "~/components/loadingPosts/loadingPosts";
import LikedPosts from "~/components/likedPosts/LikedPosts";

const ProfileFeed: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, status } = api.posts.getPostsByUserId.useQuery({ userId });

  if (status === "loading") return <LoadingPosts />;
  if (!data || data.length === 0) return <div>User has not posted</div>;

  return (
    <>
      <div className="py-869 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl space-y-4">
          {data.map((post) => (
            <UserPost {...post} key={post.post.id} />
          ))}
        </div>
      </div>
    </>
  );
};

const Profile: NextPage<{ username: string }> = ({ username }) => {
  const { data, status } = api.profiles.getUserByUsername.useQuery({
    username,
  });

  const [showLikedPosts, setShowLikedPosts] = useState(false);

  if (status === "loading") return <LoadingPosts />;

  if (!data)
    return (
      <div>
        <NotFound />
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mb-4">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <span className="text-2xl inline-flex items-center rounded-md bg-violet-50 px-2 py-1 font-medium text-violet-950 ">
              @{data.username}
            </span>
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6"></div>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <span className="sm:ml-3">
              <button
                className="flex-items-center mr-2 flex rounded border-2 border-b-4 border-violet-800 px-4 py-2 font-bold text-violet-950 shadow-md shadow-violet-300 hover:border-violet-800 hover:bg-violet-200 focus:outline-none focus:ring-4 focus:ring-violet-300 dark:bg-violet-100 dark:hover:bg-violet-200 dark:focus:ring-violet-800"
                onClick={() => setShowLikedPosts(!showLikedPosts)}
              >
                {showLikedPosts ? "Show Posts" : "Show Liked Posts"}
              </button>
            </span>
          </div>
        </div>
      </div>

      {showLikedPosts ? (
        <LikedPosts userId={data.id} />
      ) : (
        <ProfileFeed userId={data.id} />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{ username: string }> = (
  context
) => {
  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const username = slug.replace("@", "");

  return Promise.resolve({
    props: {
      username,
    },
  });
};

export default Profile;
