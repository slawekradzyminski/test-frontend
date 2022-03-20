/// <reference types="cypress" />

describe('edit page', () => {

    const users = require('../../fixtures/users.json')
    const user = users[0]

    beforeEach(() => {
        cy.setTokenInLocalStorage()
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.intercept('GET', `**/users/${user.id}`, { body: user })
        cy.visit('http://localhost:8080')
        cy.get('ul li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
    })

    it('should verify that user data was correctly autofilled', () => {
        cy.get('[name=firstName]').should('contain.value', user.firstName)
        cy.get('[name=lastName]').should('contain.value', user.lastName)
        cy.get('[name=username]').should('contain.value', user.username)
        cy.get('[name=password]').should('contain.value', user.password)
    });

})
