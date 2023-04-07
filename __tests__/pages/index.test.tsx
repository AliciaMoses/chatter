import { render, screen } from "@testing-library/react";
import Home from "../../src/pages/index";
import { useUser } from "@clerk/nextjs";

jest.mock("@clerk/nextjs", () => {
  const originalModule = jest.requireActual("@clerk/nextjs");
  return {
    ...originalModule,
    useUser: jest.fn(),
    SignInButton: jest.fn(() => <div>Sign In</div>),
    SignOutButton: jest.fn(() => <div>Sign Out</div>),
  };
});

test("renders the index page", () => {
  (useUser as jest.Mock).mockReturnValue({
    isSignedIn: false,
  });

  render(<Home />);
  const heading = screen.getByText(/Chatter/i);
  expect(heading).toBeInTheDocument();
});

test("renders the SignInButton when user is not signed in", () => {
  (useUser as jest.Mock).mockReturnValue({
    isSignedIn: false,
  });

  render(<Home />);
  const signInButton = screen.getByText(/Sign In/i);
  expect(signInButton).toBeInTheDocument();
});

test("renders the SignOutButton when user is signed in", () => {
  (useUser as jest.Mock).mockReturnValue({
    isSignedIn: true,
  });

  render(<Home />);
  const signOutButton = screen.getByText(/Sign Out/i);
  expect(signOutButton).toBeInTheDocument();
});