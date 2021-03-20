/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login')
  })

  it('should login', () => {
    cy.get('[name=username]')
      .type('slawenty').should('have.value', 'slawenty')

    cy.get('[name=password]')
      .type('password').should('have.value', 'password')

    cy.get('button').click()

    cy.get('p').first().should('have.text', "You're logged in! Congratulations :)")
  })

})
