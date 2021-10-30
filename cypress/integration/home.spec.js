/// <reference types="cypress" />

describe('Home page', () => {
    beforeEach(() => {
        cy.login('slawenty', 'password')
        cy.visit('/')
    })
  
    it('should display users', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('include', '/login')
    })

    it('should go to add user', () => {
        cy.get('#addmore').click()
        cy.url().should('include', '/add-user')
    })
  
  })