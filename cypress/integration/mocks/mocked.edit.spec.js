/// <reference types="cypress" />

describe('Edit page with mocks', () => {

    const users = require('../../fixtures/users.json')

    beforeEach(() => {
        cy.setTokenInLocalStorage()
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('')
    })

    it('should correctly autocomplete fields', () => {
        // when
        cy.intercept('GET', `**/users/${users[2].id}`, { fixture: 'gosiakowalska.json'})
        cy.get('ul li').eq(2).find('.edit').click()
        
        // then
        verifyUserDataAutocompleted(users[2])
    })

})

const verifyUserDataAutocompleted = (user) => {
    cy.get("[name='firstName']").should('have.value', user.firstName)
    cy.get("[name='lastName']").should('have.value', user.lastName)
    cy.get("[name='username']").should('have.value', user.username)
    cy.get("[name='password']").should('have.value', user.password)
}

