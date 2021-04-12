/// <reference types="cypress" />

context('Home page', () => {

    beforeEach(() => {
      cy.setTokenInLocalStorage()   
      cy.visit('/')
    })

    it('Should display at least one user', () => {
      cy.get('li').should('have.length.at.least', 1)
    })

    it('Should logout', () => {
        cy.get('#logout').click()
        cy.url().should('include', '/login')
        cy.get('h2').contains('Login')
        cy.checkUserKeyNull()
    })

  })
  