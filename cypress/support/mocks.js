import { getRandomString } from "../util/random"

Cypress.Commands.add('mockFailedLogin', () => {
    cy.intercept('POST', '**/users/authenticate', {
        statusCode: 401,
        body: {
            message: 'Login failed - bad username or password'
        }
    })
})

Cypress.Commands.add('mockFailedRegister', () => {
    cy.intercept('POST', '**/users/register', {
        statusCode: 400,
        body: {
            message: 'User already exists'
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
    }).as('loginRequest')
})

Cypress.Commands.add('mockSuccessfulRegister', () => {
    cy.intercept('POST', '**/users/register', {
        statusCode: 201,
        body: {
            id: 99,
            firstName: getRandomString(),
            lastName: getRandomString(),
            username: getRandomString(),
            pasword: getRandomString()
        }
    })
})

Cypress.Commands.add('setTokenInLocalStorage', () => {
    const user = { token: '12345' }
    window.localStorage.setItem('user', JSON.stringify(user))
})