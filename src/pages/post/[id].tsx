import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import UserPost from "~/components/userPost/UserPost";
import NotFound from "~/components/notFound/NotFound";
import Navbar from "~/components/navbar/Navbar";

type PostViewProps = {
  id: string;
};

const PostView: NextPage<PostViewProps> = ({ id }) => {
  const { data } = api.posts.getById.useQuery({
    id,
  });
  if (!data)
    return (
      <div>
        <NotFound />
      </div>
    );

  return (
    <>
      <Head>
        <title>{`${data.post.content} - @${data.author.username}`}</title>
      </Head>
      <Navbar />
      <br></br>
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <UserPost {...data} />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PostViewProps> = (
  context
) => {
  const { id } = context.query;

  if (!id || Array.isArray(id)) {
    return Promise.resolve({
      notFound: true,
    });
  }

  return Promise.resolve({
    props: {
      id,
    },
  });
};

export default PostView;
