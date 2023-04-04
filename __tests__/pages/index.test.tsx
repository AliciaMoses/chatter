import { render, screen } from "@testing-library/react";
import Home from "../../src/pages/index";


jest.mock("../../src/utils/api", () => ({
  api: {
    example: {
      hello: {
        useQuery: () => ({ data: "Hello, from tRPC" }),
      },
    },
  },
}));

test("renders the index page", () => {
  render(<Home />);
  const heading = screen.getByText(/Create T3 App/i);
  expect(heading).toBeInTheDocument();
});