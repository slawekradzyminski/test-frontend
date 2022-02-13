/// <reference types="cypress" />

describe('Home page in isolation', () => {
    const users = require('../../fixtures/users.json')
    const jozek = users[users.length - 1]

    beforeEach(() => {
        cy.setFakeTokenInLocalStorage()
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('/')
    })

    it('should display correct users', () => {
        cy.get('ul li').should('have.length', users.length)
        cy.get('ul li').last().should('contain.text', `${jozek.firstName} ${jozek.lastName}`)
    })

    it('should delete user', () => {
        cy.intercept('DELETE', `**/users/${jozek.id}`, { statusCode: 204 }).as('deleteRequest')
        cy.get('ul li').contains(`${jozek.firstName} ${jozek.lastName}`).find('.delete').click()

        cy.wait('@deleteRequest')
        cy.get('ul li').should('have.length', users.length - 1)
    })

    it('should delete all users with frontend iteration', () => {
        cy.get('ul li').each(($el, index) => {
            cy.intercept('DELETE', `**/users/${users[index].id}`, { statusCode: 204 }).as(`deleteRequest${index}`)
            cy.wrap($el).find('.delete').click()
            cy.wait(`@deleteRequest${index}`)
        })

        cy.get('ul li').should('not.exist')
    })

    it('should delete all users using foreach loop', () => {
        users.forEach((entry, index) => {
            cy.intercept('DELETE', `**/users/${entry.id}`, { statusCode: 204 }).as(`deleteRequest${index}`)
            cy.get('ul li').contains(`${entry.firstName} ${entry.lastName}`).find('.delete').click()
            cy.wait(`@deleteRequest${index}`)
        })

        cy.get('ul li').should('not.exist')
    })

})
