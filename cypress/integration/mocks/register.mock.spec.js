/// <reference types="cypress" />

import { getRandomString } from "../../util/random"

describe('register page with mocks', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('should successfully register', () => {
        const firstName = getRandomString()
        const lastName = getRandomString()
        const username = getRandomString()
        const password = getRandomString()

        cy.intercept('POST', '**/register', {
            statusCode: 201,
            body: {
                firstName: firstName,
                id: 1,
                lastName: lastName,
                password: getRandomString(),
                username: username
            }
        }).as('registerRequest')

        cy.get('[name=firstName]').type(firstName)
        cy.get('[name=lastName]').type(lastName)
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('button').click()

        cy.wait('@registerRequest').its('request.body')
            .should('deep.equal', {
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName
            })
    })

    it('should show error message on failed register if user already exists', () => {
        const errorMessage = "User already exists"

        cy.intercept('POST', '**/register', {
            statusCode: 400,
            body: {
                message: errorMessage
            }
        })

        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('button').click()
        cy.get('.alert-danger').should('contain.text', errorMessage)
    })

    it('should handle 500 from backend', () => {
        cy.intercept('POST', '**/register', {
            statusCode: 500
        })

        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('button').click()
    })

    it('should handle network error', () => {
        cy.intercept('POST', '**/register', {
            forceNetworkError: true
        })

        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('button').click()
    })

    it('should show loading state', () => {
        cy.intercept('POST', '**/register', {
            delay: 2000
        })

        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('button').click()

        cy.get('.spinner-border').should('be.visible')
    })


})