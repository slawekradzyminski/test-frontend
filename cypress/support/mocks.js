import { getRandomString } from "../util/random"

Cypress.Commands.add('mockFailedLogin', () => {
    cy.intercept('POST', '**/users/authenticate', {
        statusCode: 401,
        body: {
            message: 'Login failed - bad username or password'
        }
    })
})

Cypress.Commands.add('mockSuccessfulLogin', (firstName) => {
    cy.intercept('POST', '**/users/authenticate', {
        statusCode: 200,
        body: {
            firstName: firstName,
            id: 666,
            lastName: getRandomString(),
            token: "12345",
            username: getRandomString()
        }
    })
})