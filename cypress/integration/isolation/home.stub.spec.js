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

})
