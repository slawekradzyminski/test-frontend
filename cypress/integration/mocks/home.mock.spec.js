/// <reference types="cypress" />

describe('home page', () => {

    const users = require('../../fixtures/users.json')

    beforeEach(() => {
        cy.setTokenInLocalStorage()
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('http://localhost:8080')
    })

    it('should display at least one user', () => {
        // then
        cy.get('ul li').should('have.length', users.length)
        cy.get('ul li').eq(0).should('contain.text', `${users[0].firstName} ${users[0].lastName}`)
        cy.get('ul li').eq(1).should('contain.text', `${users[1].firstName} ${users[1].lastName}`)
    })

    it('should delete an user', () => {
        // given
        cy.intercept('DELETE', `**/users/${users[0].id}`, {
            statusCode: 204
        }).as('deleteRequest')

        // when
        cy.get('ul li').contains(`${users[0].firstName} ${users[0].lastName}`).find('.delete').click()

        // then
        cy.get('ul li').should('have.length', users.length - 1)
        cy.get('ul li').contains(`${users[0].firstName} ${users[0].lastName}`).should('not.exist')
        cy.wait('@deleteRequest')
    })

})
