/// <reference types="cypress" />

import { loginPage } from "../../pages/loginPage"
import { registerPage } from "../../pages/registerPage"
import { getRandomString } from "../../util/random"

describe('register page with mocks', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('should successfully register', () => {
        // given
        const username = getRandomString()
        const firstName = getRandomString()
        const lastName = getRandomString()
        const password = getRandomString()
        cy.mockSuccessfulLoginRegister()

        // when
        registerPage.register(username, password, firstName, lastName)

        // then
        loginPage.verifyRegistrationSuccessfulAlert()
        cy.url().should('contain', '/login')
        cy.verifyCorrectRegisterRequestBody(username, password, firstName, lastName)
        
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
