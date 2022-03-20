/// <reference types="cypress" />

import { getRandomString } from "../../util/random"

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })

    it('should show loading state', () => {
        cy.intercept('POST', '**/users/authenticate', {
            delay: 2000
        })

        cy.get("input[name='username']").type(getRandomString())
        cy.get("input[name='password']").type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('button .spinner-border').should('be.visible')
    })

    it('should successfully login', () => {
        const username = getRandomString()
        const password = getRandomString()
        const firstName = getRandomString()

        cy.intercept('POST', '**/users/authenticate', {
            statusCode: 200,
            body: {
                firstName: firstName,
                id: 1,
                lastName: getRandomString(),
                token: "123456",
                username: username
            }
        })

        cy.get("input[name='username']").type(username)
        cy.get("input[name='password']").type(password)
        cy.get('.btn-primary').click()
        cy.get('h1').should('contain.text', firstName)
    })

    it('should successfully login with slow network', () => {
        const username = getRandomString()
        const password = getRandomString()
        const firstName = getRandomString()

        cy.intercept('POST', '**/users/authenticate', {
            statusCode: 200,
            body: {
                firstName: firstName,
                id: 1,
                lastName: getRandomString(),
                token: "123456",
                username: username
            },
            throttleKbps: 1000
        })

        cy.get("input[name='username']").type(username)
        cy.get("input[name='password']").type(password)
        cy.get('.btn-primary').click()
        cy.get('h1').should('contain.text', firstName)
    })

    it('should fail to login', () => {
        const errorMessage = 'Error message'

        cy.intercept('POST', '**/users/authenticate', {
            statusCode: 401,
            body: {
                message: errorMessage
            }
        })

        cy.get("input[name='username']").type(getRandomString())
        cy.get("input[name='password']").type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', errorMessage)
            .should('have.class', 'alert-danger')
    })

    it('should handle server error', () => {
        cy.intercept('POST', '**/users/authenticate', {
            forceNetworkError: true
        })

        cy.get("input[name='username']").type(getRandomString())
        cy.get("input[name='password']").type(getRandomString())
        cy.get('.btn-primary').click()
    })

})
