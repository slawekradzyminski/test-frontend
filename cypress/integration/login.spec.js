/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login')
    cy.get('[name=username]').type('slawenty')
    cy.get('[name=password]').type('password')
    cy.get('button').click()
    cy.get('.congrats').first().should('have.text', "You're logged in! Congratulations :)")
  })

  it('should login', () => {
    cy.get('ul li').should('have.length', 2)
    // cy.get('.delete').first().click()
    // cy.get('ul li').should('have.length', 1)
  })

})