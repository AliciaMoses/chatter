import type { NextPage, GetServerSideProps } from "next";
import { api } from "~/utils/api";
import UserPost from "~/components/UserPost";

const ProfileFeed: React.FC<{ userId: string }> = ({ userId }) => {
  const { data } = api.posts.getPostsByUserId.useQuery({ userId });

  if (!data || data.length === 0) return <div>User has not posted</div>;

  return (
    <div className="flex flex-col">
      {data.map((post) => (
        <UserPost {...post} key={post.post.id} />
      ))}
    </div>
  );
};

const Profile: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profiles.getUserByUsername.useQuery({ username });

  if (!data) return <div>404</div>;

  return (
    <>
      <h1>{data.username}</h1>
      <ProfileFeed userId={data.id} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{ username: string }> = (context) => {
  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const username = slug.replace("@", "");

  return {
    props: {
      username,
    },
  };
};

export default Profile;
