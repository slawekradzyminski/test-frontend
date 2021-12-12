/// <reference types="cypress" />

import users from '../../fixtures/users.json'

describe('Mocked home', () => {

    beforeEach(() => {
        cy.setTokenInLocalStorage()
        cy.intercept('GET', '**/users', { body: users })
        cy.visit('')
    })

    it('should display all users', () => {
        cy.get('ul li').should('have.length', users.length)
        cy.get('ul li').eq(0).should('contain.text', `${users[0].firstName} ${users[0].lastName}`)
        cy.get('ul li').eq(1).should('contain.text', `${users[1].firstName} ${users[1].lastName}`)
    })

})