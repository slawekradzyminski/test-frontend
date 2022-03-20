/// <reference types="cypress" />

import { getRandomString } from "../../util/random"

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })

    it('should successfully login', () => {
        const username = getRandomString()
        const password = getRandomString()
        const firstName = getRandomString()

        cy.intercept('POST', '**/users/authenticate', {
            statusCode: 200,
            body: {
                firstName: firstName,
                id: 1,
                lastName: getRandomString(),
                token: "123456",
                username: username
            }
        })

        cy.get("input[name='username']").type(username)
        cy.get("input[name='password']").type(password)
        cy.get('.btn-primary').click()
        cy.get('h1').should('contain.text', firstName)
    })

})
