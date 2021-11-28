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
        // given 
        const message = 'User already exists'
        mockUserAlreadyExists(message)

        // when
        registerPage.register(getRandomString(), getRandomString(), getRandomString(), getRandomString())
        
        // then
        registerPage.verifyErrorMessageContains(message)
        cy.url().should('contain', '/register')
    })

    it('should show loading indicator', () => {
        // given
        mockResponseDelay()

        // when
        registerPage.register(getRandomString(), getRandomString(), getRandomString(), getRandomString())

        // then
        registerPage.verifySpinner()
    })

})

const mockResponseDelay = () => {
    cy.intercept('POST', '**/users/register', {
        delay: 1000,
    })
}

const mockUserAlreadyExists = (message) => {
    cy.intercept('POST', '**/users/register', {
        statusCode: 400,
        body: {
            message: message
        }
    })
}
