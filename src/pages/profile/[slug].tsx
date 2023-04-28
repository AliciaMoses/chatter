import type { NextPage, GetServerSideProps } from "next";
import { api } from "~/utils/api";
import UserPost from "~/components/userPost/UserPost";
import NotFound from "~/components/notFound/NotFound";
import Navbar from "~/components/navbar/Navbar";
import LoadingPosts from "~/components/loadingPosts/loadingPosts";

const ProfileFeed: React.FC<{ userId: string }> = ({ userId }) => {
  const { data, status } = api.posts.getPostsByUserId.useQuery({ userId });

  if (status === "loading") return <LoadingPosts />;
  if (!data || data.length === 0) return <div>User has not posted</div>;

  return (
    <div className="py-869 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl space-y-4">
        {data.map((post) => (
          <UserPost {...post} key={post.post.id} />
        ))}
      </div>
    </div>
  );
};

const Profile: NextPage<{ username: string }> = ({ username }) => {
  const { data, status } = api.profiles.getUserByUsername.useQuery({ username });

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
      <h1 className="text-center">
        <span className="text-md inline-flex items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-violet-700 ring-1 ring-inset ring-violet-700/10">
          @{data.username}
        </span>
      </h1>
      <br></br>
      <ProfileFeed userId={data.id} />
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
