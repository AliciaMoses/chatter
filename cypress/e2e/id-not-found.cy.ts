describe('404 Not Found - Post View', () => {
    it('should display the NotFound component when navigating to a non-existent post', () => {

      const nonExistentPostId = 'non-existent-post-id';
      cy.visit(`/post/${nonExistentPostId}`, { failOnStatusCode: false });
  

      cy.get('p')
        .contains('404')
        .should('be.visible');

      cy.get('h1')
        .contains('Page not found')
        .should('be.visible');

      cy.get('p')
        .contains("Sorry, we couldn’t find the page you’re looking for.")
        .should('be.visible');
  
      cy.get('a')
        .contains('Go back home')
        .should('be.visible');
    });
  });
  