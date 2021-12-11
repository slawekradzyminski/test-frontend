/// <reference types="cypress" />

const getRandomString = () => {
    return Math.random().toString(36).substring(7)
}

describe('Register page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/register')
    })
  
    it('should successfully register', () => {
      // given
      cy.get('[name=firstName]').type(getRandomString())
      cy.get('[name=lastName]').type(getRandomString())
      cy.get('[name=username]').type(getRandomString())
      cy.get('[name=password]').type(getRandomString())
      // when
      cy.get('.btn-primary').click()
      // then
      cy.get('.alert-success').should('have.text', 'Registration successful')
    })
  
  })