/// <reference types="cypress" />

import users from '../../fixtures/users.json'

describe('Mocked edit', () => {

    const testUser = users[0]

    beforeEach(() => {
        cy.setTokenInLocalStorage()
        cy.intercept('GET', '**/users', { body: users })
        cy.intercept('GET', '**/users/1', { body: testUser })
        cy.visit('')
    })

    it('should display all users', () => {
        // when
        cy.get('ul li').contains(`${testUser.firstName} ${testUser.lastName}`).find('.edit').click()

        // then
        cy.get('[name=firstName]').should('have.value', testUser.firstName)
        cy.get('[name=lastName]').should('have.value', testUser.lastName)
        cy.get('[name=username]').should('have.value', testUser.username)
        cy.get('[name=password]').should('have.value', testUser.password)
    })

})
