import {
  useUser,
  SignInButton,
  SignOutButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import { useRouter } from "next/router";

import Link from "next/link";

type UserObjectType = {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: {
    id: string;
    username: string;
  } | null;
};

const Navbar: React.FC = () => {
  const user = useUser() as UserObjectType;
  const router = useRouter();
  const currentPage = router.pathname;
  const currentAsPath = router.asPath;

  const currentUsername = user?.user?.username || "";
  const isOnOwnProfile = currentAsPath === `/profile/@${currentUsername}`;

  return (
    <nav
      className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Chatter</span>
          {/*
            <img className="h-8 w-auto" src="" alt="" />
           */}
        </a>
      </div>
      <div className="hidden items-center lg:flex lg:gap-x-12">
        {user.isSignedIn && (
          <>
            {currentPage !== "/" && (
              <Link href="/">
                <button
                  type="button"
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Home
                </button>
              </Link>
            )}
            {currentPage !== "/feed" && (
              <Link href="/feed">
                <button
                  type="button"
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Feed
                </button>
              </Link>
            )}
            {!isOnOwnProfile && (
              <Link href={`/profile/@${currentUsername}`}>
                <button
                  type="button"
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Profile
                </button>
              </Link>
            )}
            <SignedIn>
              <UserButton />
            </SignedIn>
          </>
        )}
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        {user.isSignedIn ? (
          <SignOutButton>
            <a className="cursor-pointer text-sm font-semibold leading-6 text-slate-400">
              Log out <span aria-hidden="true">&rarr;</span>
            </a>
          </SignOutButton>
        ) : (
          <SignInButton mode="modal" afterSignInUrl="/feed">
            <a className="cursor-pointer text-sm font-semibold leading-6 text-slate-400">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </SignInButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
