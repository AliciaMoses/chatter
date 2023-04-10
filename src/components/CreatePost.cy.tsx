import CreatePost from "../../src/components/CreatePost";

describe("CreatePost Component", () => {
  it("renders user profile image when user is signed in", () => {
    const user = {
      id: "test_user_id",
      profileImageUrl: "https://example.com/test-profile-image.jpg",
    };

    const mockUseUser = () => ({
      isLoaded: true,
      isSignedIn: true,
      user,
    });

    cy.mount(<CreatePost useUserHook={mockUseUser} />);

    cy.get("img")
      .should("have.attr", "src", "https://example.com/test-profile-image.jpg")
      .should("have.attr", "alt", "user profile image");
  });
});