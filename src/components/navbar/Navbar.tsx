import {
  useUser,
  SignInButton,
  SignOutButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";

import Link from "next/link";


const Navbar: React.FC = () => {
  const user = useUser();

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

      <div className="hidden lg:flex lg:gap-x-12">
        {user.isSignedIn && (
          <>
            <Link href="/feed">Home</Link>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </>
        )}
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        {user.isSignedIn ? (
          <SignOutButton>
            <a className="text-sm font-semibold leading-6 text-slate-400 cursor-pointer">
              Log out <span aria-hidden="true">&rarr;</span>
            </a>
          </SignOutButton>
        ) : (
          <SignInButton afterSignInUrl="/feed">
            <a className="text-sm font-semibold leading-6 text-slate-400 cursor-pointer">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </SignInButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
