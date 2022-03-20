/// <reference types="cypress" />

import { getRandomString } from "../../util/random"

describe('home page', () => {

    const users = require('../../fixtures/users.json')

    beforeEach(() => {
        const user = { token: '12345' }
        localStorage.setItem('user', JSON.stringify(user))
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('http://localhost:8080')
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length', users.length)
        cy.get('ul li').eq(0).should('contain.text', `${users[0].firstName} ${users[0].lastName}`)
        cy.get('ul li').eq(1).should('contain.text', `${users[1].firstName} ${users[1].lastName}`)
    })

})
