/// <reference types="cypress" />

describe('home page with mocks', () => {
    const users = require('../../fixtures/users.json')

    beforeEach(() => {
        cy.setTokenInLocalStorage()
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('')
    })

    it('should autofill user data', () => {
        cy.intercept('GET', `**/users/${users[0].id}`, { fixture: 'firstUser.json' })
        cy.get('ul li').contains(`${users[0].firstName} ${users[0].lastName}`).find('.edit').click()

        cy.get('[name=firstName]').should('have.value', users[0].firstName)
        cy.get('[name=lastName]').should('have.value', users[0].lastName)
        cy.get('[name=username]').should('have.value', users[0].username)
        cy.get('[name=password]').should('have.value', users[0].password)
    })


})