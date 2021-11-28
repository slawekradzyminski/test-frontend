/// <reference types="cypress" />

import { getRandomString } from "../../util/random"

describe('register page with mocks', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('should successfully register', () => {
        cy.intercept('POST', '**/users/register', {
            statusCode: 201,
            body: {
                id: 1,
                username: getRandomString(),
                firstName: getRandomString(),
                lastName: getRandomString(),
                password: getRandomString()
            }
        }).as('registerRequest')

        const username = getRandomString()
        const firstName = getRandomString()
        const lastName = getRandomString()
        const password = getRandomString()
        cy.get('[name=username]').type(username)
        cy.get('[name=password').type(password)
        cy.get('[name=firstName]').type(firstName)
        cy.get('[name=lastName]').type(lastName)
        cy.get('button').click()

        cy.get('.alert').should('have.text', 'Registration successful')
        cy.url().should('contain', '/login')
        cy.wait('@registerRequest').its('request.body')
            .should('deep.equal', { username, password, firstName, lastName })
    })

    it('should fail to register if user already exists', () => {
        const message = 'User already exists'
        cy.intercept('POST', '**/users/register', {
            statusCode: 400,
            body: {
                message: message
            }
        })

        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password').type(getRandomString())
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('button').click()

        cy.get('.alert-danger').should('have.text', message)
        cy.url().should('contain', '/register')
    })

    it('should show loading indicator', () => {
        cy.intercept('POST', '**/users/register', {
            delay: 1000,
        })
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password').type(getRandomString())
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('button').click()

        cy.get('.spinner-border').should('be.visible')
    })

})
