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
  const heading = screen.getByText(/Create/i);
  expect(heading).toBeInTheDocument();
});