/// <reference types="cypress" />

describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the title', () => {
    cy.get('head title').should('have.text', 'Chatter');
  });

  it('renders the welcome message', () => {
    cy.get('h1').should('contain.text', 'Welcome to Chatter');
  });

  it('renders the development message', () => {
    cy.get('p').should('contain.text', 'This application is currently in development');
  });

  it('renders the sign in button when user is not signed in', () => {
    cy.get('[data-testid=SignInButton]').should('be.visible');
  });

  it('should display the correct page title', () => {    
    cy.title().should('eq', 'Chatter');
  });

  
    it('should have the correct background gradient and text color', () => {
    
      cy.get('main').should(
        'have.css',
        'background-color',
        'rgb(255, 255, 255)',
      );
  
      cy.get('main h1').should('have.css', 'color', 'rgb(0, 0, 0)');
  
      cy.get('main p').should('have.css', 'color', 'rgb(0, 0, 0)');
    });
  

});