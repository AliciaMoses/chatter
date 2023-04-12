
import UserPost from './UserPost';

const mockPostData = {
  post: {
    id: '1',
    content: 'Hello, World!',
    createdAt: new Date().toISOString(),
  },
  author: {
    username: 'test_user',
    profileImageUrl: 'https://example.com/test-profile-image.jpg',
  },
};

describe('UserPost Component', () => {
  it('renders post content', () => {
    cy.mount(<UserPost {...mockPostData} />);
    cy.contains(mockPostData.post.content);
  });

  it('renders author username', () => {
    cy.mount(<UserPost {...mockPostData} />);
    cy.contains(`@${mockPostData.author.username}`);
  });

  it('renders author profile image', () => {
    cy.mount(<UserPost {...mockPostData} />);
    cy.get('img')
      .should('have.attr', 'src', mockPostData.author.profileImageUrl)
      .should('have.attr', 'alt', `Profile image of ${mockPostData.author.username}`);
  });
});
