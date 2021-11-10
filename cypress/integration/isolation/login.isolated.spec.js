/// <reference types="cypress" />

import {getRandomString} from "../../util/random";

describe('[Mocked] Login page', () => {
    const firstName = getRandomString()

    beforeEach(() => {
        cy.intercept('POST', '**/users/authenticate', {
            statusCode: 200,
            body: {
                firstName: firstName,
                id: 1,
                lastName: "Radzyminski",
                token: "123456",
                username: "slawenty"
            }
        }).as('loginRequest')
        cy.intercept('GET', '**/users', { fixture: 'users.json' })
        cy.visit('/')
    })

    it('should successfully login', () => {
        // given
        const username = getRandomString()
        const password = getRandomString()
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)

        // when
        cy.get('.btn-primary').click()

        // then
        cy.wait('@loginRequest').its('request.body')
            .should('deep.equal', {
                username: username,
                password: password
            })
        cy.get('h1').should('contain.text', firstName)
        cy.get('ul li').should('have.length', 2)
        cy.get('ul li').should('have.length', 2)
    })

})