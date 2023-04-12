import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import UserPost from "~/components/UserPost";

type PostViewProps = {
  id: string;
};

const PostView: NextPage<PostViewProps> = ({ id }) => {
  const { data } = api.posts.getById.useQuery({
    id,
  });
  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - @${data.author.username}`}</title>
      </Head>

      <UserPost {...data} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PostViewProps> = (context) => {
  const { id } = context.query;

  if (!id || Array.isArray(id)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id,
    },
  };
};

export default PostView;
