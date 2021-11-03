/// <reference types="cypress" />

import { getRandomString } from '../../util/randomUtil'

const getCredentials = () => {
    return {
        username: getRandomString(),
        password: getRandomString(),
        firstName: getRandomString(),
        lastName: getRandomString()
    }
}

const fillCredentials = (credentials) => {
    cy.get('[name=firstName]').clear().type(credentials.firstName)
    cy.get('[name=lastName').clear().type(credentials.lastName)
    cy.get('[name=username]').clear().type(credentials.username)
    cy.get('[name=password').clear().type(credentials.password)
}

const assertCorrectRequestWasSent = (credentials, id) => {
    cy.wait('@editRequest').its('request.body')
        .should('deep.equal', {
            "id": id,
            "firstName": credentials.firstName,
            "lastName": credentials.lastName,
            "username": credentials.username,
            "password": credentials.password,
        })
}

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
        const credentials = getCredentials()
        fillCredentials(credentials)
        cy.intercept('PUT', `**/users/${userResponse[0].id}`).as('editRequest')

        // when
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert-success').should('have.text', 'Updating user successful')
        assertCorrectRequestWasSent(credentials, userResponse[0].id)
    })

})