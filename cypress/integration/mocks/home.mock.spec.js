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

})