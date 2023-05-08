import React from "react";
import GitHubIcon from "./GitHubIcon";
import PrintIcon from "./PrintIcon";

const AuthSection: React.FC = () => {
  return (
    <div className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="font-vt323 text-3xl font-bold tracking-tight text-violet-900 sm:text-4xl">
              Developer-centric and Secure
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-800">
              Chatter is built for developers who value simplicity and
              efficiency.{" "}
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-800">
              Powered by Clerk, we ensure seamless and secure authentication.{" "}
            </p>
            <p className="mt-4 text-xl font-semibold leading-8 text-slate-800">
              Sign in using your GitHub account and get started instantly...{" "}
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <button
                type="submit"
                className="flex-none rounded border-2  border-b-4 border-violet-800 bg-violet-500 px-4 py-2 text-sm font-bold text-violet-950 shadow-md shadow-violet-300 hover:border-violet-800 hover:bg-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-300 focus-visible:outline focus-visible:outline-2   focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:bg-violet-100 dark:hover:bg-violet-200 dark:focus:ring-violet-800"
              >
                Sign Up
              </button>
              <button
                type="submit"
                className="flex-none rounded border-2  border-b-4 border-violet-300 bg-violet-300 px-4 py-2 text-sm font-bold text-slate-500  shadow-md shadow-violet-300 hover:border-violet-600 hover:bg-violet-200 focus:outline-none focus:ring-4 focus:ring-violet-300 focus-visible:outline focus-visible:outline-2   focus-visible:outline-offset-2 focus-visible:outline-violet-300 dark:bg-violet-100 dark:hover:bg-violet-200 dark:focus:ring-violet-600"
              >
                Sign In
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <GitHubIcon />
              <dt className="mt-4 font-semibold text-violet-800">OAuth 2.0</dt>
              <dd className="mt-2 leading-7 text-slate-800">{`Enjoy secure sign-in with GitHub's OAuth 2.0 protocol.`}</dd>
            </div>
            <div className="flex flex-col items-start">
              <PrintIcon />
              <dt className="mt-4 font-semibold text-violet-800">
                Clerk Authentication
              </dt>
              <dd className="mt-2 leading-7 text-slate-800">{`Leverage Clerk's user account management platform for a secure experience.`}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        aria-hidden="true"
      >
        <div className="aspect-[1155/678] w-[72.1875rem]" />
      </div>
    </div>
  );
};

export default AuthSection;
