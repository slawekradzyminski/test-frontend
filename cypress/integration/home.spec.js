/// <reference types="cypress" />

describe('Home page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
        cy.login('slawenty', 'password')
    })
  
    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', '/login')
    })

    it('should open add more users page', () => {
        cy.get('#addmore').click()
        cy.url().should('eq', 'http://localhost:8080/add-user')
    })
  
  })
  