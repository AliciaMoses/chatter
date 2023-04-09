/// <reference types="cypress" />

describe('Home Component', () => {
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

});