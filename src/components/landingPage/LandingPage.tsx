import { api } from "../../utils/api";
import { SignUpButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import UserPost from "~/components/userPost/UserPost";
import RocketIcon from "./RocketIcon";
import ScrollButton from "./ScrollDownButton";
import SummarySection from "./summarySection/SummarySection";
import React, { useRef } from "react";
import DownArrowIcon from "./DownArrowIcon";
import AuthSection from "./authSection/AuthSection";
import FeaturesSection from "./featuresSection/FeaturesSection";
import StartTour from "./startTour/StartTour";
import ScrollToTargetLink from "./ScrollLink";

const LandingPage = () => {
  const { data } = api.posts.getAll.useQuery();
  const recentPosts = data ? data.slice(-1) : [];
  const user = useUser();

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const topRef = useRef(null);

  return (
    <>
      <div className="overflow-hidden py-24 sm:py-32" ref={topRef}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <div className="relative inline-block">
                  <div className="relative inline-block">
                    <pre className="typewriter font-vt323 text-9xl font-black  text-slate-800 ">
                      {`Hello...  `}
                    </pre>

                    <div className="typewriter-cursor absolute inset-0"></div>
                  </div>
                </div>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-slate-600 lg:max-w-none"></dl>
                {user.isSignedIn ? (
                  <Link href="/feed">
                    <button className="flex-items-center mr-2 flex rounded border-2 border-b-4 border-violet-800 px-4 py-2 font-bold text-violet-950 shadow-md shadow-violet-300 hover:border-violet-800 hover:bg-violet-200 focus:outline-none focus:ring-4 focus:ring-violet-300 dark:bg-violet-100 dark:hover:bg-violet-200 dark:focus:ring-violet-800">
                      Enter the Chattersphere...
                      <RocketIcon />
                    </button>
                  </Link>
                ) : (
                  <SignUpButton mode="modal" afterSignInUrl="/feed">
                    <button className="flex-items-center mr-2 flex rounded border-2 border-b-4 border-violet-800 px-4 py-2 font-bold text-violet-950 shadow-md shadow-violet-300 hover:border-violet-800 hover:bg-violet-200 focus:outline-none focus:ring-4 focus:ring-violet-300 dark:bg-violet-100 dark:hover:bg-violet-200 dark:focus:ring-violet-800">
                      <span className="mr-2">Join Us via GitHub</span>
                      <RocketIcon />
                    </button>
                  </SignUpButton>
                )}
              </div>
            </div>
            <div className="post-animation">
              {recentPosts.map((individualPost) => (
                <div data-testid="user-post" key={individualPost.post.id}>
                  <UserPost {...individualPost} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <StartTour />
      <div className="my-4 flex justify-center">
        <ScrollButton targetRef={section1Ref} icon={<DownArrowIcon />} />
      </div>
      <div ref={section1Ref}>
        <AuthSection />
      </div>
      <div className="my-4 flex justify-center">
        <ScrollButton targetRef={section2Ref} icon={<DownArrowIcon />} />
      </div>
      <div ref={section2Ref}>
        <FeaturesSection />
      </div>
      <div className="my-4 flex justify-center">
        <ScrollButton targetRef={section3Ref} icon={<DownArrowIcon />} />
      </div>
      <div ref={section3Ref}>
        <SummarySection />
        <div className="my-4 flex justify-center">
          <ScrollToTargetLink targetRef={topRef} text="Back to Top" />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
