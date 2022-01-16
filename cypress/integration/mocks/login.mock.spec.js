/// <reference types="cypress" />

import { getRandomString } from "../../util/random"

describe('login page with mocks', {
    env: {
        mobile: true,
    },
}, () => {
    beforeEach(() => {
        cy.visit('')
        if (Cypress.env('mobile')) {
            cy.viewport('macbook-16')
        }

        cy.intercept('GET', '**/users', { fixture: 'users.json' }).as('getUsers')
    })

    it('should successfully login', () => {
        const firstName = getRandomString()
        const username = getRandomString()
        const password = getRandomString()

        cy.intercept('POST', '**/authenticate', {
            statusCode: 200,
            body: {
                firstName: firstName,
                id: 1,
                lastName: getRandomString(),
                token: "123456",
                username: username
            }
        }).as('loginRequest')

        cy.get('.form-group').within(() => {
            cy.get('input').eq(0).type(username)
            cy.get('input').eq(1).type(password)
            cy.get('button').click()
        })

        cy.get('h1').should('contain.text', `Hi ${firstName}`)
        cy.wait('@getUsers')
        cy.wait('@loginRequest').its('request.body')
            .should('deep.equal', {
                username: username,
                password: password
            })
    })

    it('should show error message on failed login', () => {
        const errorMessage = 'Login failed - bad username or password'

        cy.intercept('POST', '**/authenticate', {
            statusCode: 401,
            body: {
                message: errorMessage
            }
        })

        cy.get('.form-group input').eq(0).type(getRandomString())
        cy.get('.form-group input').eq(1).type(getRandomString())
        cy.get('.form-group button').click()
        cy.get('.alert').should('contain.text', errorMessage)  
    })


})