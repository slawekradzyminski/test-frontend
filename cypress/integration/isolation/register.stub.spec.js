/// <reference types="cypress" />

import { getRandomNumber, getRandomString } from "../../util/random"

describe('Register page in isolation', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('should successfully register', () => {
        const username = getRandomString()
        const firstName = getRandomString()
        const password = getRandomString()
        const lastName = getRandomString()
        const id = getRandomNumber()

        cy.intercept('POST', '**/users/register', {
            statusCode: 201,
            body: { firstName, lastName, password, username, id }
        }).as('registerRequest')

        cy.get('[name=username]').type(username)
        cy.get('[name=firstName]').type(firstName)
        cy.get('[name=lastName]').type(lastName)
        cy.get('[name=password]').type(password)
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', 'Registration successful')
            .should('not.have.class', 'alert-danger')

        cy.wait('@registerRequest').its('request.body')
            .should('deep.equal', {
                password, username, firstName, lastName
            })
    })

    it('should fail to register', () => {
        const message = 'You failed'

        cy.intercept('POST', '**/users/register', {
            statusCode: 400,
            body: {
                message: message
            }
        })

        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', message)
            .should('have.class', 'alert-danger')
    })

})
