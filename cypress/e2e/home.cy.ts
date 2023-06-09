/// <reference types="cypress" />

describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the title', () => {
    cy.get('head title').should('have.text', 'Chatter');
  });

  it('renders the leading text', () => {
    cy.get('h2').should('contain.text', 'leading text');
  });

  it('renders the welcome message', () => {
    cy.get('p').should('contain.text', 'Welcome to CHATTER');
  });

  it('renders the description message', () => {
    cy.get('p').should('contain.text', 'Welcome, this is Chatter!');
  });

  it('renders the sign in button', () => {
    cy.get('button').should('contain.text', 'Join via GitHub');
  });

  it('should display the correct page title', () => {    
    cy.title().should('eq', 'Chatter');
  });

  it('should render the navbar with the correct links', () => {
    cy.get('nav a').should('have.length', 2);
    cy.get('nav a').eq(0).should('contain.text', 'Chatter');
  });

  it('should render recent posts', () => {
    cy.get('[data-testid="user-post"]').should('have.length.at.least', 1);
  });

});
