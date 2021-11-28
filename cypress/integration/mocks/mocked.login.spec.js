/// <reference types="cypress" />

import { homePage } from "../../pages/homePage"
import { loginPage } from "../../pages/loginPage"
import { getRandomString } from "../../util/random"

describe('login page with mocks', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })

    it('should successfully login', () => {
        // given
        const firstName = getRandomString()
        const username = getRandomString()
        const password = getRandomString()
        cy.mockSuccessfulLogin(firstName)

        // when
        loginPage.login(username, password)

        // then
        homePage.verifyWelcomeMessage(firstName)
        cy.verifyCorrectLoginRequestBody(username, password)
    })

    it('should fail to login', () => {
        // given
        const message = 'Login failed'
        mockFailedLogin(message)

        // when
        loginPage.login(getRandomString(), getRandomString())

        // then
        loginPage.verifyLoginFailedErrorMessage(message)
    })

    it('should show loading indicator', () => {
        // given
        mockDelay()
        
        // when
        loginPage.login(getRandomString(), getRandomString())

        // then
        loginPage.verifySpinner()
    })

})

const mockDelay = () => {
    cy.intercept('POST', '**/users/authenticate', {
        delay: 1000,
    })
}

const mockFailedLogin = (message) => {
    cy.intercept('POST', '**/users/authenticate', {
        statusCode: 401,
        body: {
            message: message
        }
    })
}

