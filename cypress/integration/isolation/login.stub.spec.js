/// <reference types="cypress" />

import { getRandomString } from "../../util/random"

describe('Login page in isolation', () => {
    beforeEach(() => {
        cy.visit('')
    })

    it('should successfully login', () => {
        const firstName = getRandomString()

        cy.intercept('POST', '**/users/authenticate', {
            statusCode: 200,
            body: {
                firstName: firstName,
                id: 19,
                lastName: getRandomString(),
                token: "123456",
                username: getRandomString()
            }
        })

        cy.get('.form-control').eq(0).type(getRandomString())
        cy.get('.form-control').eq(1).type(getRandomString())
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', `Hi ${firstName}`)
    })

})
