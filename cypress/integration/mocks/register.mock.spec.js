/// <reference types="cypress" />

import { getRandomString } from "../../util/random"

describe('register page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/register')
    })

    it('should successfully register', () => {
        const username = getRandomString()
        const password = getRandomString()

        cy.intercept('POST', '**/users/register', {
            statusCode: 201,
            body: {
                firstName: getRandomString(),
                id: 1,
                lastName: getRandomString(),
                password: password,
                username: username
                }
        })

        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('.btn-primary').click()
        cy.get('.alert-success')
            .should('have.text', 'Registration successful')
    })

})
