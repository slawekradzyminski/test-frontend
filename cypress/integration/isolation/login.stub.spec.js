/// <reference types="cypress" />

import { getRandomString } from "../../util/random"

describe('Login page in isolation', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('should successfully login', () => {
        const firstName = getRandomString()

        cy.intercept('POST', '**/users/authenticate', {
            statusCode: 200,
            body: {
                firstName: firstName,
                id: 19,
                lastName: getRandomString(),
                token: "123456",
                username: getRandomString()
            }
        })

        cy.get('.form-control').eq(0).type(getRandomString())
        cy.get('.form-control').eq(1).type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', `Hi ${firstName}`)
    })

    it('should fail to login', () => {
        const message = 'You failed'

        cy.intercept('POST', '**/users/authenticate', {
            statusCode: 401,
            body: {
                message: message
            }
        })

        cy.get('.form-control').eq(0).type('wrong')
        cy.get('.form-control').eq(1).type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', message)
            .should('have.class', 'alert-danger')
    })

    it('should handle server error', () => {
        cy.intercept('POST', '**/users/authenticate', {
            statusCode: 500
        })

        cy.get('.form-control').eq(0).type('wrong')
        cy.get('.form-control').eq(1).type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.class', 'alert-danger')
    })

    it('should handle network disconnect', () => {
        cy.intercept('POST', '**/users/authenticate', {
            forceNetworkError: true
        })

        cy.get('.form-control').eq(0).type('wrong')
        cy.get('.form-control').eq(1).type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.class', 'alert-danger')
    })

    it('should display spinner while waiting', () => {
        cy.intercept('POST', '**/users/authenticate', {
            delay: 3000
        })

        cy.get('.form-control').eq(0).type('wrong')
        cy.get('.form-control').eq(1).type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

})
