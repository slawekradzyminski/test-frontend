/// <reference types="cypress" />

describe('Edit user', () => {

    const userResponse = require('../../fixtures/getAllUsers.json')

    beforeEach(() => {
        cy.setTokenInLocalStorage()
        cy.intercept('**/users', { fixture: 'getAllUsers.json' })
        cy.intercept('**/users/1', { fixture: 'getFirstUser.json' })
        cy.visit('/')
    })
  
    it('should fill each field correctly', () => {
        cy.get('.edit').first().click()
        cy.get('[name=firstName]').should('have.value', userResponse[0].firstName)
        cy.get('[name=lastName').should('have.value', userResponse[0].lastName)
        cy.get('[name=username').should('have.value', userResponse[0].username)
        cy.get('[name=password').should('have.value', userResponse[0].password)
    })

  })