import { api } from "../../utils/api";
import UserPost from "~/components/userPost/UserPost";

const LandingPage = () => {
  const { data } = api.posts.getAll.useQuery();
  const recentPosts = data ? data.slice(-3) : [];

  return (
    <div className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="font-mono text-base font-semibold leading-7 text-slate-400">
                leading text
              </h2>
              <p className="mt-2 font-mono text-3xl font-black tracking-tight text-slate-400 sm:text-4xl">
                Welcome to CHATTER
              </p>
              <p className="mt-6 font-mono text-lg leading-8 text-gray-600">
                Welcome, this is Chatter!
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none"></dl>
              <button className="rounded border-2 border-slate-200 px-4 py-2 font-mono text-slate-600 shadow-md hover:bg-gray-200">
                Sign in via GitHub
              </button>
            </div>
          </div>
          <div>
            {recentPosts.map((individualPost) => (
              <div data-testid="user-post" key={individualPost.post.id}>
                <UserPost {...individualPost} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
