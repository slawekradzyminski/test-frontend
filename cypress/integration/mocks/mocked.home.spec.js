/// <reference types="cypress" />

describe('Home page with mocks', () => {

    const users = require('../../fixtures/users.json')

    beforeEach(() => {
        cy.setTokenInLocalStorage()
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('')
    })

    it('should display all users', () => {
        // then
        cy.get('ul li').should('have.length', users.length)
        cy.get('ul li').eq(0).should('contain.text',
            `${users[0].firstName} ${users[0].lastName}`)
        cy.get('ul li').eq(1).should('contain.text',
            `${users[1].firstName} ${users[1].lastName}`)
    })

    it('should delete user', () => {
        // given
        cy.intercept('DELETE', `**/users/${users[2].id}`, {
            statusCode: 204
        }).as('deleteRequest')

        // when
        cy.get('ul li').eq(2).find('.delete').click()

        // then
        cy.wait('@deleteRequest')
    })

})
