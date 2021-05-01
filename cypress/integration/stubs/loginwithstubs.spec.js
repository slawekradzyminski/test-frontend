/// <reference types="cypress" />

import {loginPageCss} from "../../pages/loginpage";

context('Login page', () => {

    const firstName = "firstName"
    const lastName = "lastName"
    const username = "username"
    const password = "password"

    beforeEach(() => {
        cy.visit('/')

        cy.intercept('POST', '**/users/authenticate', {
            "id": 3,
            "username": username,
            "firstName": firstName,
            "lastName": lastName,
            "token": "123456"
        }).as('login')
    })

    it('should login', () => {
        cy.get(loginPageCss.loginField).type(username)
        cy.get(loginPageCss.passwordField).type(password)
        cy.get(loginPageCss.loginButton).click()
        cy.get('h1').should('have.text', `Hi ${firstName}!`).as('Krzysztof')
        cy.wait('@login')
            .its('request.body')
            .should('deep.equal', {
                "username": username + 'dsfdsf',
                "password": password
            })
    })

})
