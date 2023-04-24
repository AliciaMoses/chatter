import { api } from "../../utils/api";
import { SignUpButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import UserPost from "~/components/userPost/UserPost";

const LandingPage = () => {
  const { data } = api.posts.getAll.useQuery();
  const recentPosts = data ? data.slice(-3) : [];
  const user = useUser();

  return (
    <div className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <div className="relative inline-block">
                <div className="relative inline-block">
                  <pre className="font-VT323 typewriter text-3xl font-black tracking-tight text-slate-600 sm:text-4xl">
                    {`Hello, this is Chatter :)`}
                  </pre>
                  <div className="typewriter-cursor absolute inset-0"></div>
                </div>
              </div>

              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none"></dl>
              {user.isSignedIn ? (
                <Link href="/feed">
                  <button className="rounded border-2 border-slate-200 px-4 py-2 font-mono text-slate-600 shadow-md hover:bg-gray-200">
                    Join the Chattersphere...
                  </button>
                </Link>
              ) : (
                <SignUpButton mode="modal" afterSignInUrl="/feed">
                  <button className="rounded border-2 border-slate-200 px-4 py-2 font-mono text-slate-600 shadow-md hover:bg-gray-200">
                    Join via GitHub
                  </button>
                </SignUpButton>
              )}
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
