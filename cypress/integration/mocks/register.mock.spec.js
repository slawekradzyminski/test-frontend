/// <reference types="cypress" />

import { getRandomString } from "../../util/random"

describe('register page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/register')
    })

    it('should successfully register', () => {
        const username = getRandomString()
        const password = getRandomString()
        const firstName = getRandomString()
        const lastName = getRandomString()

        cy.intercept('POST', '**/users/register', {
            statusCode: 201,
            body: {
                firstName: firstName,
                id: 1,
                lastName: lastName,
                password: password,
                username: username
            }
        }).as('registerRequest')

        cy.get('[name=firstName]').type(firstName)
        cy.get('[name=lastName]').type(lastName)
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('.btn-primary').click()
        cy.get('.alert-success')
            .should('have.text', 'Registration successful')

        cy.wait('@registerRequest').its('request.body').should('deep.equal', {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        })
    })

    it('should fail to register', () => {
        cy.intercept('POST', '**/users/register', {
            statusCode: 400,
            body: {
                message: "User already exists"
            }
        })

        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()
        cy.get('.alert-danger')
            .should('have.text', 'User already exists')
    })

    it('should show loading state', () => {
        cy.intercept('POST', '**/users/register', {
            delay: 2000
        })

        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()
        cy.get('.spinner-border').should('be.visible');
    })

})
