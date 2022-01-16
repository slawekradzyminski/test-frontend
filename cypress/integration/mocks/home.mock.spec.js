/// <reference types="cypress" />

describe('home page with mocks', () => {
    const users = require('../../fixtures/users.json')

    beforeEach(() => {
        cy.setTokenInLocalStorage()
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('')
    })

    it('should display two users', () => {
        cy.get('ul li').should('have.length', users.length)
        cy.get('ul li').eq(0).should('contain.text', `${users[0].firstName} ${users[0].lastName}`)
        cy.get('ul li').eq(1).should('contain.text', `${users[1].firstName} ${users[1].lastName}`)
    })

    it('should delete a user', () => {
        cy.intercept('DELETE', `**/users/${users[0].id}`, { statusCode: 200 }).as('deleteRequest')
        cy.get('ul li').contains(`${users[0].firstName} ${users[0].lastName}`).find('.delete').click()

        cy.get('ul li').should('have.length', users.length - 1)
        cy.get('ul li').contains(`${users[0].firstName} ${users[0].lastName}`).should('not.exist')
        cy.wait('@deleteRequest')
    })

    it('should show Deleting... during delete', () => {
        cy.intercept('DELETE', `**/users/${users[0].id}`, { delay: 10000 })
        cy.get('ul li').contains(`${users[0].firstName} ${users[0].lastName}`).find('.delete').click()

        cy.get('ul li').contains(`${users[0].firstName} ${users[0].lastName}`).should('contain.text', 'Deleting')
    })

})