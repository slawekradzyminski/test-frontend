/// <reference types="cypress" />

import { homePage } from "../../pages/homePage"
import { loginPage } from "../../pages/loginPage"
import { getRandomString } from "../../util/randomUtil"

const verifyLoginRequestBody = (username, password) => {
    cy.get('@loginRequest').its('request.body')
    .should('deep.equal', {
        "username": username,
        "password": password
    })
}

describe('Login page with mocks', () => {

    beforeEach(() => {
        cy.visit('/')

        cy.intercept('**/users', { fixture: 'getAllUsers.json' })
    })

    it('should login correctly', () => {
        // given
        const firstName = getRandomString()
        const username = getRandomString()
        const password = getRandomString()
        cy.mockSuccessfulLogin(firstName)

        // when
        loginPage.login(username, password)

        // then
        homePage.verifyWelcomeMessage(firstName)
        homePage.verifyNumberOfUsers(2)
        verifyLoginRequestBody(username, password)        
    })

    it('should handle login failure correctly', () => {
        const message = getRandomString()

        cy.intercept('POST', '**/users/authenticate', {
            statusCode: 401,
            body: {
                message: message
            }
        })

        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()
        cy.get('.alert-danger').should('contain.text', message)
    })

    it('should handle server error correctly', () => {
        const message = getRandomString()

        cy.intercept('POST', '**/users/authenticate', {
            forceNetworkError: true
        })

        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('.btn-primary').click()

        cy.intercept('POST', '**/users/authenticate', {
            statusCode: 200,
            body: {
                firstName: getRandomString(),
                id: 1,
                lastName: getRandomString(),
                token: getRandomString(),
                username: getRandomString()
            }
        })

        cy.get('.btn-primary').click()

    })



})
