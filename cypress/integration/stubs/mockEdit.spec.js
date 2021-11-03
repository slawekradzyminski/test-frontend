/// <reference types="cypress" />

import { getRandomString } from '../../util/randomUtil'

describe('Edit user', () => {

    const userResponse = require('../../fixtures/getAllUsers.json')

    beforeEach(() => {
        cy.setTokenInLocalStorage()
        cy.intercept('**/users', { fixture: 'getAllUsers.json' })
        cy.intercept('**/users/1', { fixture: 'getFirstUser.json' })
        cy.visit('/')
        cy.get('.edit').first().click()
    })

    it('should fill each field correctly', () => {
        cy.get('[name=firstName]').should('have.value', userResponse[0].firstName)
        cy.get('[name=lastName').should('have.value', userResponse[0].lastName)
        cy.get('[name=username').should('have.value', userResponse[0].username)
        cy.get('[name=password').should('have.value', userResponse[0].password)
    })

    it('should send correct request to backend', () => {
        // given
        const username = getRandomString()
        const password = getRandomString()
        const firstName = getRandomString()
        const lastName = getRandomString()
        cy.get('[name=firstName]').clear().type(firstName)
        cy.get('[name=lastName').clear().type(lastName)
        cy.get('[name=username]').clear().type(username)
        cy.get('[name=password').clear().type(password)

        cy.intercept('PUT', `**/users/${userResponse[0].id}`, {
            statusCode: 200
        }).as('editRequest')

        // when
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert-success').should('have.text', 'Updating user successful')
        cy.wait('@editRequest').its('request.body')
            .should('deep.equal', {
                "id": userResponse[0].id,
                "firstName": firstName,
                "lastName": lastName,
                "username": username,
                "password": password,
            })
    })

})