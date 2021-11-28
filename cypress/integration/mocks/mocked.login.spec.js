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

        cy.intercept('POST', '**/users/authenticate', {
            statusCode: 200,
            body: {
                id: 1,
                token: "12345",
                username: getRandomString(),
                lastName: getRandomString(),
                firstName: firstName
            }
        }).as('loginRequest')
        const username = getRandomString()
        const password = getRandomString()

        // when
        loginPage.login(username, password)

        // then
        homePage.verifyWelcomeMessage(firstName)
        cy.wait('@loginRequest').its('request.body')
            .should('deep.equal', {
                username: username,
                password: password
            })
    })

    it('should fail to login', () => {
        const message = 'Login failed'

        cy.intercept('POST', '**/users/authenticate', {
            statusCode: 401,
            body: {
                message: message
            }
        })
        loginPage.login(getRandomString(), getRandomString())

        cy.get('.alert-danger').should('have.text', message)
    })

    it('should show loading indicator', () => {
        cy.intercept('POST', '**/users/authenticate', {
            delay: 1000,
        })
        loginPage.login(getRandomString(), getRandomString())
        cy.get('.spinner-border').should('be.visible')
    })

})
