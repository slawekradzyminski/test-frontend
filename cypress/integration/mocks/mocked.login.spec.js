/// <reference types="cypress" />

import { getRandomString } from "../../util/random"

describe('login page with mocks', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })

    it('should successfully login', () => {
        const firstName = getRandomString()

        cy.intercept('POST', '**/users/authenticate', {
            statusCode: 200,
            body: {
                id: 1,
                token: "12345",
                username: getRandomString(),
                lastName: getRandomString(),
                firstName: firstName
            }
        })
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('button').click()
        cy.get('h1').should('have.text', `Hi ${firstName}!`)
    })

    it('should fail to login', () => {
        const message = 'Login failed'

        cy.intercept('POST', '**/users/authenticate', {
            statusCode: 401,
            body: {
                message: message
            }
        })
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('button').click()

        cy.get('.alert-danger').should('have.text', message)
    })

    it('should show loading indicator', () => {
        cy.intercept('POST', '**/users/authenticate', {
            delay: 1000,
        })
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('button').click()
        cy.get('.spinner-border').should('be.visible')
    })

})
